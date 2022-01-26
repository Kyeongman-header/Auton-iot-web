export interface GraphProperty{
    //이차원 배열로, WhatToShow에서 지정된 요소들을 전부 그래프로 그려준다.
    inside_dates_properties? : Date[][],
    inside_values_properties? : number[][],
    outside_dates_properties? : Date[][],
    outside_values_properties? : number[][],
}