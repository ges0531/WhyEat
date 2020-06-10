import React, { FunctionComponent, useState, useEffect, Component } from 'react';

const UserRank: FunctionComponent<any> = ({ }) => {
    return (
        <>
            <h1>WishListRank Page</h1>
            <h3>20대 다른사람들은<br />
                무엇을 가장<br />
                사고 싶어 할까요?<br />
            </h3>
            <ul>
                <p><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAkFBMVEX////19fX29vb39/f4+PgAAAD5+fnX19cJCQnd3d38/PxsbGysrKw4ODjDw8Pb29vIyMgxMTEfHx/n5+fR0dF3d3fu7u7o6OjNzc1BQUF6enq/v79vb2+tra1JSUlRUVFjY2MUFBRMTExbW1tmZmaSkpItLS2CgoK2trYQEBCXl5efn59DQ0MkJCSHh4eUlJSAJH5BAAAEa0lEQVR4nO2a23ayOhRGCSAUD6AGAhVPlCpatf/7v91OCGcQAoSOfZF50eHQ6jdZK0TFJUkCgUAgEAgEAoFAUGLurn3fNyfDUDvyrfPmer1uUlYpn5Qn4RjzRTilhEXOKd8xi5y9Y2qtAvB4375irtdUpOSQ5ufpldgscR/jUHYpzmLdKvAIXtsgCLaUV4dLRaXJJT38feITOZHc1oFdsN1Q1Sjnt8gl4x/mJ+HRwLLMgXBxdg7qEHi2lmgkt26B4Cmrsqy8QX2HxoR0w4uiUwBggYkMOAiMM5AOnQL3RKB/CVgMGCpwDz6pwCRNmFaAwYCpBanAFCXoJzCBARbo2gdYBIYb4I0oPAFmAf4lkB6v2YaDwGADaTGbrdoFPu4FAb4GqiL3FuDYBFUBADAJrFgE+hrE8UME+GxHSfwgAQ4GuPdghMDYZVCI5yyQGmitBsX4gQLtJdBUBKvFeBc/VKDVQHMt+K4E1Xg2gQ92AQWHAMMAWq0LzfGDBd4YqApCMoAIILlu0BQ/XKDRQAXQMAzokr+oYtAcz1dAlQ3LSIFM8SMEGgw0VMhXNJZ4JoEZFtDqAnUDFeYChQ60xf+BQHv8KIGaQVHA1ZjiWQSctwJVA7wDGaUSdMfzFVCRYRQNGOIZBTZvBGpNgMUSKN3pvAU0lG0EOmTLHylQb4JlEQXdNgBTA0YL1A1cBGQEIWv+aIGagabKQFYZ688oMOshILMeOTcBeVQ8DwF5TDxPgUHxXATkEfHMAg2fB4oCg+P5CIyIZxZQJopnrwCYJn68wMj4HgKNBqPjxwlwiO8jUDXgEt9LAEwQzyhwpQKAf/wwAY7xPQUA9/i+AswftCYT4A+bgCbNp0LaMwi8dEufCiNkEPiYkhmDwNRwE7g/V0Fw3ATB5/352n78vUDwHX4fw/B0WlyPx/D19wJ4sdyzzrIX4H+4BoCizecavdqpRFsG8gmPCixPDr7cZIfFXy3nGkCS7xmQXGyMz37bszH4Bv3mnWMRstO59gjB0NdkTGUd48XYlPg2vtM0/RzT0w1o+A8qEEOv+RFcF8VQVZThYqCrmzcyDbGsjkiYiZ9VtaeiOjkCbEMNzbVdEygaoMwAoYoAhHY2leMXDynf8eoK5I4LnSo5n2+xBBVY5gL5hc+4Bi4qk4SXKHUBH17cxZKGZeXNM28JZrkCNsSvnrxYIl5sQ5buwopoaV3YJRreB5LVQOtP1optQQSxADTXXrJoSs+3ylReqbC6vHSNpXjZIvQq/5C3jRTCN9f+QZck+PiNfi8/9cEb7sSTPIclmfH5uVx+oyi6kZ/S52j9iBzHIXNGYejEA0eLZvan07uHcs7HN09OZpkWX8mM1eXm0p1IN/3b8vEPK+12Dg44n89kHCoejvoiw1JPMjiVzFBl02WVTWiV85nNWpFBq2zGisxWLXDuLooLfvA9PRklmGtKer4nKy09c5OOV5uctbNA5eFsTdHzobrF4DQZb4Qt7woCgUAgEAgEAoFA8Hf8B2OJ/VwqLPbCAAAAAElFTkSuQmCC'
                    width="100px"
                    height="100px"
                />1위 맥북프로<button>변경하기</button></p>
                <p><img src='https://images.kbench.com/kbench/article/thumbnail/125332.jpg'
                width="100px"
                height="100px"
                />2위 아이패드<button>변경하기</button></p>
                <p><img src='https://mi0.rightinthebox.com/images/50x50/201807/urrhvt1530870381960.jpg'
                width="100px"
                height="100px"
                 />3위 애플워치<button>변경하기</button></p>
            </ul>
            {/* <styledBtn>이전 화면으로 돌아가기</styledBtn> */}
        </>
    )
}

export default UserRank;