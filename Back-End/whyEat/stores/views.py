from rest_framework import viewsets
from .serializers import StoreSerializer, StoreScoreSerializer, StoreMenuSerializer
from .models import Store, Store_score, Store_menu
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from sqlalchemy import create_engine
import pandas as pd
import shutil
import sys
import numpy as np
from scipy import linalg
from scipy.sparse.linalg import svds
import json


@api_view(['GET', 'POST'])
def store_list(request, kakao_id):
    user_kakao = kakao_id
    if request.method == 'GET':
        engine = create_engine(
            'mysql+pymysql://root:1234@localhost/prim', convert_unicode=True)
        conn = engine.connect()
        final_df = pd.read_sql_table('stores_store_score', conn)
        # final_df.rename(columns={'user_id': 'user'}, axis='columns')
        user_store_rating = final_df.pivot_table(
            'score', index='user_id', columns='store_name').fillna(0)
        # matrix는 pivot_table 값을 numpy matrix로 만드는 것
        matrix = user_store_rating.as_matrix()
        # user_rating_mean 은 사용자의 평균 평점
        user_ratings_mean = np.mean(matrix, axis=1)
        # matrix_user_mean 은 사용자-스토어에 대해 사용자 평균 평점을 뺀 것
        matrix_user_mean = matrix - user_ratings_mean.reshape(-1, 1)
        # 다시 df 처리
        pd.DataFrame(matrix_user_mean,
                     columns=user_store_rating.columns)

        # print(pd.DataFrame(matrix_user_mean, columns=user_store_rating.columns).head())
        # Python scipy에서 제공해주는 svd 사용
        # U행렬, sigma 행렬, V 전치행렬을 반환
        U, sigma, Vt = svds(matrix_user_mean, k=12)
        # print(U.shape)
        # print(sigma.shape)
        # print(Vt.shape)
        # SIGMA는 0이 아닌 값만 1차원 행렬로 표현도미
        # 즉, 0이 포함된 대칭행렬로 변환할 때는 numpy의 diag를 이용
        sigma = np.diag(sigma)
        # 현재까지
        # 1. user-store 평점 행렬 있음
        # 2. 이를 user의 평균점수를 빼서 matrix_user_mean 으로 만듬
        # 3. 2번의 값을 SVD 적용해 각 행렬을 구함
        # 4. Sigma 행렬은 현재 0이 포함이 되지 않은 값으로만 구성이 되어, 대칭행렬로 변환
        # 이제 해야할 것은 SVD로 분해한 것을 U, SIGMA, Vt의 내적을 통해 복구
        # 그리고 아까 평균 빼주었으니 이제 더해준다.

        svd_user_predicted_ratings = np.dot(
            np.dot(U, sigma), Vt) + user_ratings_mean.reshape(-1, 1)
        df_svd_preds = pd.DataFrame(
            svd_user_predicted_ratings, index=user_store_rating.index, columns=user_store_rating.columns)

        def recommend_stores(df_svd_preds, user_id, ori_stores_df, ori_ratings_df, num_recommendations=5):
            print('here check')
            isempty = ori_stores_df[ori_stores_df['user_id'].str.contains(
                str(user_id), na=False)].empty

            if not isempty:
                print('여기는 들어있는거')
                # 현재는 index로 적용 되어있는거라 -1 해줘야함
                # user_row_number = ori_stores_df[ori_stores_df['user_id']
                #                                 == user_id]['id']-1
                user_row_number = user_id
                # 여기가 수정부분
                # user_row_number = ori_stores_df.loc[ori_stores_df['user_id'] == str(user_id), [
                #     'id']]
                # user_row_number = user_row_number.reset_index()

                # print(user_row_number)
                # print(type(user_row_number))
                # user_row_number = user_row_number.loc[1]['id']
                # print(type(user_row_number))
                # print(user_row_number)
                # 여기까지 수정부분 끝

                # 최종적으로 만든 df_svd_preds 에서 사용자 index에 따라 스토어 데이터 정렬
                sorted_user_predictions = df_svd_preds.loc[str(user_row_number)].sort_values(
                    ascending=False)

                # 원본 평점 데이터에서 user id 에 해당하는 데이터를 뽑아낸다

                user_data = ori_ratings_df[ori_ratings_df.user_id == str(
                    user_id)]
                # 위에서 뽑은 user_data와 원본 스토어 데이터를 합친다.
                if not user_data.empty:
                    print('제발')
                    # user_history = user_data.merge(ori_stores_df, on='store_name').sort_values([
                    #     'score'], ascending=False)
                    user_history = user_data.merge(
                        ori_stores_df, on='store_name')
                    # 원본 스토어 데이터에서 사용자가 평점 남긴 스토어를 제외한 데이터를 추출
                    recommendations = ori_stores_df[~ori_stores_df['store_name'].isin(
                        user_history['store_name'])]

                    # 사용자의 스토어 평점이 높은 순으로 정렬된 데이터와 위 추천 합친다
                    recommendations = recommendations.merge(pd.DataFrame(
                        sorted_user_predictions).reset_index(), on='store_name')
                    print(recommendations.columns)
                    # 컬럼 이름 바꾸고 정렬해서 return
                    recommendations = recommendations.rename(
                        columns={str(user_row_number): 'Predictions'}).sort_values('Predictions')
                else:
                    print('여기는 empty')
                    # 원본 스토어 데이터에서 사용자가 평점 남긴 스토어를 제외한 데이터를 추출
                    recommendations = ori_stores_df
                    # 사용자의 스토어 평점이 높은 순으로 정렬된 데이터와 위 추천 합친다

                    recommendations = recommendations.merge(pd.DataFrame(
                        sorted_user_predictions).reset_index(), on='store_name')

                    # 컬럼 이름 바꾸고 정렬해서 return
                    print(recommendations.columns)
                    recommendations = recommendations.rename(
                        columns={str(user_id): 'Predictions'}, inplace=True).sort_values('Predictions')

                return recommendations
            else:
                recommendations = ori_stores_df
                # 사용자의 스토어 평점이 높은 순으로 정렬된 데이터와 위 추천 합친다

                recommendations = recommendations.merge(pd.DataFrame(
                    sorted_user_predictions).reset_index(), on='store_name')

                # 컬럼 이름 바꾸고 정렬해서 return
                recommendations = recommendations.rename(
                    columns={user_row_number: 'Predictions'}).sort_values('Predictions')

            return recommendations
        result = recommend_stores(
            df_svd_preds, user_kakao, final_df, final_df, 50)
        result.drop_duplicates(['store_name'])

        result = result.drop_duplicates(['store_name']).head(5)
        print(result)
        # print(result.drop_duplicates(['store_name']).head(10))
        print(type(result))
        result = result.to_json(orient='records')
        result2 = json.loads(result)

        return Response(result2, status=200)

        # return Response(serializer.data)
    else:
        serializer = StoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET'])
def store_detail(request, store_pk):
    store = get_object_or_404(Store, store_id=store_pk)
    if request.method == 'GET':
        serializer = StoreSerializer(store)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def score_list(request, kakao_id):
    # print(kakao_id)
    if request.method == 'POST':
        for menu in request.data.get('foodList'):
            if menu == '돈가스':
                Store_score(store_id=149, store_name='101번지 남산돈까스', user_id=str(kakao_id), score=4, score_mean=3.272727272727273,
                            store_image='https://img.siksinhot.com/place/1527163945608148.jpg?w=280&h=224&c=Y', rep_price=9800.0).save()
            elif menu == '떡볶이':
                Store_score(store_id=102336, store_name='동대문엽기떡복이', user_id=str(kakao_id), score=3, score_mean=2.0,
                            store_image='https://img.siksinhot.com/place/1482375189974669.jpg?w=280&h=224&c=Y', rep_price=14000.0).save()
            elif menu == '회':
                Store_score(store_id=164429, store_name='바다회사랑', user_id=str(kakao_id), score=4, score_mean=4.1,
                            store_image='https://img.siksinhot.com/place/1541391810672244.jpg?w=280&h=224&c=Y', rep_price=33000.0).save()
            elif menu == '파스타':
                Store_score(store_id=8911, store_name='JB파스타', user_id=str(kakao_id), score=4, score_mean=4.125,
                            store_image='https://img.siksinhot.com/place/1453447715291386.jpg?w=280&h=224&c=Y', rep_price=7000.0).save()
            elif menu == '곱창':
                Store_score(store_id=32688, store_name='곱창고', user_id=str(kakao_id), score=3.8, score_mean=3.7142857142857135,
                            store_image='https://img.siksinhot.com/place/1467723323615055.jpg?w=280&h=224&c=Y', rep_price=9900.0).save()
            elif menu == '김치찌개':
                Store_score(store_id=174195, store_name='백채김치찌개', user_id=str(kakao_id), score=4, score_mean=3.6,
                            store_image='https://img.siksinhot.com/place/1453365701387218.jpg?w=280&h=224&c=Y', rep_price=6000.0).save()
            elif menu == '피자':
                Store_score(store_id=92286, store_name='더피자보이즈', user_id=str(kakao_id), score=4, score_mean=4.25,
                            store_image='https://img.siksinhot.com/place/1493849832298133.jpg?w=280&h=224&c=Y', rep_price=20000.0).save()
            elif menu == '치킨':
                Store_score(store_id=6308, store_name='BHC치킨', user_id=str(kakao_id), score=4, score_mean=4.5,
                            store_image='https://img.siksinhot.com/place/1491962216167189.jpg?w=280&h=224&c=Y', rep_price=18000.0).save()
            elif menu == '삼겹살':
                Store_score(store_id=181510, store_name='복돈이부추삼겹살', user_id=str(kakao_id), score=4, score_mean=3.0,
                            store_image='https://img.siksinhot.com/place/1352711131503121.jpg?w=280&h=224&c=Y', rep_price=8000.0).save()
            elif menu == '중식':
                Store_score(store_id=358978, store_name='중식당 청담', user_id=str(kakao_id), score=4, score_mean=3.7,
                            store_image='https://img.siksinhot.com/place/1524802449166359.jpg?w=280&h=224&c=Y', rep_price=80000.0).save()
            elif menu == '초밥':
                Store_score(store_id=279485, store_name='여우골초밥', user_id=str(kakao_id), score=4, score_mean=3.2857142857142856,
                            store_image='https://img.siksinhot.com/place/1355377152041942.jpg?w=280&h=224&c=Y', rep_price=190000.0).save()
            elif menu == '카페':
                Store_score(store_id=149007, store_name='모로코코 카페', user_id=str(kakao_id), score=4, score_mean=4.0,
                            store_image='https://img.siksinhot.com/place/1530514777768078.JPG?w=280&h=224&c=Y', rep_price=6000.0).save()
            elif menu == '스테이크':
                Store_score(store_id=96709, store_name='도쿄스테이크', user_id=str(kakao_id), score=4, score_mean=3.0,
                            store_image='https://img.siksinhot.com/place/1458715775334731.jpg?w=280&h=224&c=Y', rep_price=15900.0).save()
            elif menu == '순대국':
                Store_score(store_id=219024, store_name='서일순대국', user_id=str(kakao_id), score=4, score_mean=4.6,
                            store_image='https://img.siksinhot.com/place/1554005706686147.jpg?w=280&h=224&c=Y', rep_price=28000.0).save()
            elif menu == '칼국수':
                Store_score(store_id=145459, store_name='명동칼국수', user_id=str(kakao_id), score=4, score_mean=4.2,
                            store_image='https://img.siksinhot.com/place/1454618251130187.jpg?w=280&h=224&c=Y', rep_price=0).save()
            elif menu == '에머이':
                Store_score(store_id=276703, store_name='에머이', user_id=str(kakao_id), score=4, score_mean=3.75,
                            store_image='https://img.siksinhot.com/place/1503503387595591.jpg?w=280&h=224&c=Y', rep_price=0).save()
            elif menu == '햄버거':
                Store_score(store_id=139181, store_name='맥도날드', user_id=str(kakao_id), score=4, score_mean=3.8,
                            store_image='https://img.siksinhot.com/place/1534502476259865.jpg?w=280&h=224&c=Y', rep_price=4900.0).save()
            elif menu == '족발':
                Store_score(store_id=14596, store_name='가장맛있는족발', user_id=str(kakao_id), score=4, score_mean=4.5,
                            store_image='https://img.siksinhot.com/place/1446556288345142.jpg?w=280&h=224&c=Y', rep_price=0).save()
        # print(request.data.get('foodList')[0])
        # score = Store_score.objects.all()
        # serializer = StoreScoreSerializer(score, many=True)
        return Response(status=200)
    else:
        serializer = StoreScoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
