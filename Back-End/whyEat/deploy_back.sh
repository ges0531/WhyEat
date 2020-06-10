#!/bin/bash

CURRENT_PID=$(pgrep -f runserver)

echo "$CURRENT_PID"

if [-z $CURRENT_PID]; then echo ">실행중 아님"
else echo "> kill -15 $CURRENT_PID PID 종료"
        sudo kill -15 $CURRENT_PID
        sudo sleep 5
fi
# if [ -f "$DB_FILE" ]; then
#     rm $DB_FILE
# fi
# python3 manage.py migrate

echo "> Excute Django"

ls -al

echo "> nohp python3 manage.py runserver 0:8000 %"

BUILD_ID=dontKillMe nohup python3 manage.py runserver 0:8000 &

sleep 5

echo "> pgrep -f runserver"

pgrep -f runserver