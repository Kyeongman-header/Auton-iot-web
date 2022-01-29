import { Machine } from "../components/Types/TypesMachine"
import {ListOfWhatToShowProperty} from "../components/Types/TypesWhatToShowProperty"

export const Sample_Machines: Machine[] = [
  //api에서 데이터를 가져온 다음 각각에 대해 selected : false, searched : true를 붙여서 새로운 배열 행을 만들어 줘야 한다.
  //단 사이트가 처음부터 휑하면 좀 그러니깐 맨 처음 꺼는 무조건 true로 넣자.
  {
    id: "41",
    car_number: "12하 1234",
    selected: true,
    searched: true,
    gps_dates: [
      "2022-01-01T03:00:00",
      "2022-01-01T03:01:00",
      "2022-01-02T03:02:00",
    ],
    gps: [
      "SRID=4326;POINT (127.414955 37.147545)",
      "SRID=4326;POINT (127.414955 37.147545)",
      "SRID=4326;POINT (127.414955 37.147545)",
    ],
    drawable: [
      {
        name: ListOfWhatToShowProperty[0],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [10, 5, 10],
      },
      {
        name: ListOfWhatToShowProperty[1],
        dates: [
          "2022-01-01T05:00:00",
          "2022-01-01T05:01:00",
          "2022-01-02T06:02:00",
        ],
        values: [8, 8, 10],
      },
      {
        name: ListOfWhatToShowProperty[2],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[3],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[4],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[5],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[6],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[7],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [10, 5, 10],
      },
      {
        name: ListOfWhatToShowProperty[8],
        dates: [
          "2022-01-01T05:00:00",
          "2022-01-01T05:01:00",
          "2022-01-02T06:02:00",
        ],
        values: [8, 8, 10],
      },
      {
        name: ListOfWhatToShowProperty[9],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
    ],
  },
  {
    id: "42",
    car_number: "12하 1212",
    user: "sky@naver.com",
    selected: false,
    searched: true,
    gps_dates: [
      "2022-01-01T03:00:00",
      "2022-01-01T03:01:00",
      "2022-01-02T03:02:00",
    ],
    gps: [
      "SRID=4326;POINT (127.414955 37.147545)",
      "SRID=4326;POINT (127.414955 37.147545)",
      "SRID=4326;POINT (127.414955 37.147545)",
    ],
    drawable: [
      {
        name: ListOfWhatToShowProperty[0],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [10, 5, 10],
      },
      {
        name: ListOfWhatToShowProperty[1],
        dates: [
          "2022-01-01T05:00:00",
          "2022-01-01T05:01:00",
          "2022-01-02T06:02:00",
        ],
        values: [8, 8, 10],
      },
      {
        name: ListOfWhatToShowProperty[2],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[3],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[4],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[5],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[6],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[7],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [10, 5, 10],
      },
      {
        name: ListOfWhatToShowProperty[8],
        dates: [
          "2022-01-01T05:00:00",
          "2022-01-01T05:01:00",
          "2022-01-02T06:02:00",
        ],
        values: [8, 8, 10],
      },
      {
        name: ListOfWhatToShowProperty[9],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
    ],
  },
  {
    id: "43",
    car_number: "12하 1255",
    selected: false,
    searched: true,
    gps_dates: [
      "2022-01-01T03:00:00",
      "2022-01-01T03:01:00",
      "2022-01-02T03:02:00",
    ],
    gps: [
      "SRID=4326;POINT (127.414955 37.147545)",
      "SRID=4326;POINT (127.414955 37.147545)",
      "SRID=4326;POINT (127.414955 37.147545)",
    ],
    drawable: [
      {
        name: ListOfWhatToShowProperty[0],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [10, 5, 10],
      },
      {
        name: ListOfWhatToShowProperty[1],
        dates: [
          "2022-01-01T05:00:00",
          "2022-01-01T05:01:00",
          "2022-01-02T06:02:00",
        ],
        values: [8, 8, 10],
      },
      {
        name: ListOfWhatToShowProperty[2],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[3],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[4],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[5],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[6],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
      {
        name: ListOfWhatToShowProperty[7],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [10, 5, 10],
      },
      {
        name: ListOfWhatToShowProperty[8],
        dates: [
          "2022-01-01T05:00:00",
          "2022-01-01T05:01:00",
          "2022-01-02T06:02:00",
        ],
        values: [8, 8, 10],
      },
      {
        name: ListOfWhatToShowProperty[9],
        dates: [
          "2022-01-01T03:00:00",
          "2022-01-01T03:01:00",
          "2022-01-02T03:02:00",
        ],
        values: [5, 10, 6],
      },
    ],
  },
];