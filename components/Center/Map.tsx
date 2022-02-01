import {Wrapper,Status} from '@googlemaps/react-wrapper';
import React, { useEffect, useRef, useState } from 'react';
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ForGpsState, latlng, OneGpsState } from '../../redux/forgps_slices';
import { datesandvalue } from '../Types/TypesMachine';



const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a: any, b: any) => {
      if (
        isLatLngLiteral(a) ||
        a instanceof google.maps.LatLng ||
        isLatLngLiteral(b) ||
        b instanceof google.maps.LatLng
      ) {
        return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
      }
  
      // TODO extend to other types
  
      // use fast-equals for other objects
      return deepEqual(a, b);
    }
  );
  
  function useDeepCompareMemoize(value: any) {
    const ref = useRef();
  
    if (!deepCompareEqualsForMaps(value, ref.current)) {
      ref.current = value;
    }
  
    return ref.current;
  }
  
function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: any[]
  ) {
    useEffect(callback, dependencies.map(useDeepCompareMemoize));
  }


export interface MapProperty{
    onegpsstate : OneGpsState,
    datesandvalue : datesandvalue[],
}

export default function Map( {onegpsstate,datesandvalue } : MapProperty)
{

    
    const render = (status: Status) => {
      return <h1>{status}</h1>;
    };
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(7); // initial zoom
    
    
    const korea = { lat: 36.844, lng: 127.836};
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
      lat: korea.lat,
      lng: korea.lng,
    });
  
    const onClick = (e: google.maps.MapMouseEvent) => {
      // avoid directly mutating state
      setClicks([...clicks, e.latLng!]);
    };
  
    const onIdle = (m: google.maps.Map) => {
      setZoom(m.getZoom()!);
      setCenter(m.getCenter()!.toJSON());
    };

  
    //titles는 각각 마커들의 제목(시간.) [~~.toString()+" " + ~~.toString(), ... ] 
    //contents는 각각 마커들의 내용. 각 마커에 표시할 datesandvalues의 average들. [["CO : "+~~.toString(),"PM25 : "+~~.toString(),...], [], [], ...] 
    //positions는 각각 마커들의 위치 [{lat:~, lng:~}]
    //onegpsstate를 가지고 이 세개의 배열들을 만들어 낸다. 방법은 다음과 같다.
    //onegpsstate는 기본적으로 정렬되어 있으므로 이들을 순차적으로 보면서, now의 lng와 lat에서 0.01이상 바뀐 순간을 체크하여 now의 gps_date와 그 순간의 gps_date를 가진다. 이제 now는 그 순간의 gps_Date이다.
    //이 두 gps_date는 각각 gte,lte가 되어서 datesandvalue에서 filter를 이용하여 그 사이 값을 각각의 항목에 대해 추출하여, content에 저장한다.
    // content들은 다시 더 큰 contents에 묶인다. 언제? 데이터가 생성될때.
    
    const [contents,setcontents] =useState<any[]>([]);
    const [positions,setpositions] =useState<latlng[]>([]);
    //let positions : google.maps.LatLng[] = [];
    const [titles,settitles]=useState<string[]>([]);
    useEffect(()=>{
      let temp_contents:any[]=[];
      let temp_positions:latlng[]=[];
      let temp_titles:string[]=[];
      if(onegpsstate.gps.length!==0 && datesandvalue.length!==0){
        let nowlatlng=onegpsstate.gps[0].latlng;
        let gte=onegpsstate.gps[0].gps_date;
        let lte="";
        let content : string[]=[];
        for(let onegpsstategpsindex=0;onegpsstategpsindex<onegpsstate.gps.length;onegpsstategpsindex++)
        {
          lte=onegpsstate.gps[onegpsstategpsindex].gps_date;
          if (
            Math.abs(
              nowlatlng.lat - onegpsstate.gps[onegpsstategpsindex].latlng.lat
            ) >= 0.005 ||
            Math.abs(
              nowlatlng.lng - onegpsstate.gps[onegpsstategpsindex].latlng.lng
            ) >= 0.005 ||
            onegpsstategpsindex === onegpsstate.gps.length - 1//마지막 요소일때.
          ) {
            
            datesandvalue.map((dav, index) => {
              let betweenvalues = dav.values.filter((value, index, array) => {
                let date = new Date(dav.dates[index]).getTime();
                return (
                  date <= new Date(lte).getTime() && date >= new Date(gte).getTime()
                );
              });
    
              let average: number = 0;
              let count: number = 0;
              betweenvalues.map((bv, index) => {
                average = average + bv;
                count++;
              });
              average = average / count;
              content.push(dav.name + " : " + average.toString());
            });
    
            //데이터들을 추가해주는 장소이다.
            temp_contents.push(content);
            temp_positions.push({lat:nowlatlng.lat, lng:nowlatlng.lng});
            //positions.push(new google.maps.LatLng(nowlatlng.lat, nowlatlng.lng));
            temp_titles.push(gte + " ~ " + lte);
    
            //now와 gte를 현재의 latlng, 시간으로 바꿔주는 작업이다.
            nowlatlng=onegpsstate.gps[onegpsstategpsindex].latlng;
            gte = lte;
            content=[];
          }
          
        }
      }
      setcontents(temp_contents);
      setpositions(temp_positions);
      settitles(temp_titles);
    },[onegpsstate,datesandvalue])
    


    return (
      <div style={{ display: "flex", height: "100%" }}>
        <Wrapper apiKey={"AIzaSyBiGmir-vwuBV4J8wHq8hvJ-ge6-L5EIEc"} render={render}>
          <MyMapComponent
            center={center}
            onClick={onClick}
            onIdle={onIdle}
            zoom={zoom}
            titles={titles}
            contents={contents as [string[]]}
            positions={positions}
            style={{ flexGrow: "1", height: "100%" }}
          >
            {/* <Marker position={position} title={"marker1"} clickable={true} />
            <Marker position={position2} title={"marker1"} clickable={true} />
            <Marker position={position3} title={"marker1"} clickable={true} /> */}
            {/* <Marker position={position2} />
            <Marker position={position3} /> */}
            {/* {clicks.map((latLng, i) => (
              <Marker key={i} position={latLng} />
            ))} */}
          </MyMapComponent>
        </Wrapper>
      </div>
    );
    // [END maps_react_map_component_app_return]
  };

interface MyMapComponent extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  titles : string[],
  contents:[string[]],
  positions: google.maps.LatLng[] | latlng[],
}

const MyMapComponent : React.FC<MyMapComponent>=({
  onClick,
  onIdle,
  children,
  style,
  titles,
  contents,
  positions,
  ...options
})=> {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
  const [polyline,setPolyLine]=useState<google.maps.Polyline>();
  const [marker, setMarker] = React.useState<google.maps.Marker[]>([]);
  const [infowindow,setInfoWindow] = useState<google.maps.InfoWindow[]>([]);
  const [contentStrings,setcontentStrings] =useState<string[]>([]);
  
  useEffect(()=>{
    let temp_contentStrings=[];
    for(let index=0; index<titles.length; index++){
      let nowcontents=contents[index].map((content,index)=>'<p>'+content+'</p>').join('\n')
      let contentString='<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">'+titles[index]+'</h1>' +
      '<div id="bodyContent">' +
      nowcontents+
      "</div>" +
      "</div>";
      temp_contentStrings.push(contentString); 
    }

    setcontentStrings(temp_contentStrings);
  },[contents,titles])
    

    useEffect(() => {
          marker.length!==0 && infowindow.length!==0 && marker.map((m,index)=>{
            m.addListener("click", ()=>{
            infowindow[index].open({
              anchor:m,
              map:map,
            shouldFocus : false,
            })
          });
        });
      },[marker,infowindow,map]);
      
    useEffect(() => {
      let temp_InfoWindows:google.maps.InfoWindow[]=[];
      
      for(let index=0;index<titles.length;index++)
      {
      temp_InfoWindows.push(new google.maps.InfoWindow({
        content: contentStrings[index],
      }));
    }

      if (infowindow.length===0 && contentStrings.length!==0) {
        setInfoWindow(temp_InfoWindows);
      }
      // remove marker from map on unmount\
    }, [infowindow,contentStrings,titles]);

    useEffect(()=>{
      if(infowindow.length!==0)
      {
        let temp_infowindow = infowindow.slice();
        temp_infowindow.map((info, index) =>
          info.setContent(contentStrings[index])
        );
        setInfoWindow(temp_infowindow);
      }
    },[contentStrings])




    React.useEffect(() => {
      let temp_Markers:google.maps.Marker[]=[];
      for(let index=0;index<titles.length;index++)
      {
      temp_Markers.push(new google.maps.Marker());
    }
    
      if (marker.length===0) {
        setMarker(temp_Markers);
      }

      // remove marker from map on unmount
      return () => {
        if (marker) {
          marker.map((m,index)=>m.setMap(null));
        }
      };
    }, [marker]);

    React.useEffect(() => {
      // positions.map((p,index)=>console.log(p.lat().toString() +" " + p.lng().toString()));
      if (marker) {
        marker.map((m,index)=>m.setOptions({position : positions[index]}));
      }
    }, [marker, options]);
  

  // let path : google.maps.LatLng[]=[];
  // //약간 rendering dependency 문제인지, 이렇게 변수로 선언해 주지 않고 state로 path를 관리하면 아예 안 뜬다.
  // forgps && forgps.gps.map((g,index)=>{
  //     //temppath.push(new google.maps.LatLng(g.latlng.lat,g.latlng.lng));
  //     path.push(new google.maps.LatLng(g.latlng.lat,g.latlng.lng));
  //   })
  // const path_test= [
  //   { lat: 37.772, lng: -122.214 },
  //   { lat: 21.291, lng: -157.821 },
  //   { lat: -18.142, lng: 178.431 },
  //   { lat: -27.467, lng: 153.027 },
  // ];

  


  React.useEffect(() => {
    // positions.map((p,index)=>console.log(p.lat().toString() +" " + p.lng().toString()));
    if (!polyline && positions) {
      setPolyLine(new google.maps.Polyline({
      path: positions,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      }));
    }
  },[polyline]);

  useEffect(()=>{ 
    polyline && map && polyline.setMap(map);
    marker && map && marker.map((m,index)=>m.setMap(map));
    return () => {
      if (polyline) {
        polyline.setMap(null);
      }
      if(marker){
        marker.map((m,index)=>m.setMap(null));
      }
    };
  },)
  //

    
      //==========기본 세팅.
      useEffect(() => {
        if (ref.current && !map) {
          setMap(new window.google.maps.Map(ref.current, {
          }));
        }
      },[ref,map]);
      useEffect(() => {
        if (map) {
          ["click", "idle"].forEach((eventName) =>
            google.maps.event.clearListeners(map, eventName)
          );
      
          if (onClick) {
            map.addListener("click", onClick);
          }
      
          if (onIdle) {
            //map.addListener("idle", () => onIdle(map)); 깜빡임 현상의 주범!!
          }
        }
      }, [map, onClick, onIdle]);
    
      useDeepCompareEffectForMaps(() => {
        if (map) {
          map.setOptions(options);
        }
      }, [map, options]);

      //---------기본 세팅. 그냥 건드리지 말자.


  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // set the map prop on the child component
        return React.cloneElement(child, { map });
      }
    })}
    </>
  );
}



    



// const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
//     const [marker, setMarker] = React.useState<google.maps.Marker>();
//     const [infowindow,setInfoWindow] = useState<google.maps.InfoWindow>();
//     const contentString =
//       '<div id="content">' +
//       '<div id="siteNotice">' +
//       "</div>" +
//       '<h1 id="firstHeading" class="firstHeading">'+title+'</h1>' +
//       '<div id="bodyContent">' +
//       '<p>hi</p>'+
//       "</div>" +
//       "</div>";

    

//     useEffect(() => {
//           marker && infowindow && marker.addListener("click", ()=>{
//             infowindow.open({
//               anchor:marker,
//               map:options.map,
//             })
//           });
//       });
//       React.useEffect(() => {
//         if (!infowindow) {
//           setInfoWindow(new google.maps.InfoWindow({
//             content:contentString,
            
//           }));
//         }
//         // remove marker from map on unmount\
//       }, [infowindow]);


//     React.useEffect(() => {
//       if (!marker) {
//         setMarker(new google.maps.Marker());
//       }

//       // remove marker from map on unmount
//       return () => {
//         if (marker) {
//           marker.setMap(null);
//         }
//       };
//     }, [marker]);

//     React.useEffect(() => {
//       if (marker) {
//         marker.setOptions(options);
//       }
//     }, [marker, options]);

//   return null;
// };
