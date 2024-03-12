#!/bin/bash
for file in $(find ./$1 -type f)
do
    cat $file
done
