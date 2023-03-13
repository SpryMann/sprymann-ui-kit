const getTouchEventData = (
  event:
    | TouchEvent
    | MouseEvent
    | React.TouchEvent<HTMLDivElement>
    | React.MouseEvent<HTMLDivElement>
) => ('changedTouches' in event ? event.changedTouches[0] : event);

export default getTouchEventData;
