

export default function convertDateToString(gte : Date, lte : Date, expandhour? : boolean ){

    const lte_yy=lte.getFullYear();
    const lte_mm=lte.getMonth()+1;
    const lte_dd=lte.getDate();
    const pub_date__lte=lte_yy+'-'+lte_mm+'-'+lte_dd;
    
    const gte_yy=gte.getFullYear();
    const gte_mm=gte.getMonth()+1;
    const gte_dd=gte.getDate();
    const pub_date__gte=gte_yy+'-'+gte_mm+'-'+gte_dd;

    return [pub_date__gte,pub_date__lte]
}