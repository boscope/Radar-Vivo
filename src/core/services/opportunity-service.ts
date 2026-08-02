import { supabase } from "../../../lib/supabase";

export async function getOpportunities(){

const {data,error}=await supabase
.from("opportunities")
.select("*")
.order("score",{ascending:false});

if(error){

console.error(error);

return [];

}

return data;

}
