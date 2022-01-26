import Card from './Card';
import type {CardProperty} from '../Types/TypesCardProperty'
export interface InfinityScrollCardsProperty{
    cardsproperty : CardProperty[],
    handlewhattoshowproperty : (index : string)=>void,
}

export default function InfinityScrollCards({cardsproperty,handlewhattoshowproperty} : InfinityScrollCardsProperty){

    return (
        // 여기서는 무한 스크롤(모든 컴포넌트를 렌더링하는 것이 아닌 스크롤을 내리면 그때 렌더링)을 구현해야 한다.
      <div className="grid grid-cols-1 justify-items-stretch h-fit">
        {cardsproperty.map((cardproperty, index) => (
          <Card key={index} cardproperty={cardproperty} handlewhattoshowproperty={handlewhattoshowproperty} />
        ))}
      </div>
    );
}