type Props={
title:string;
value:string;
description:string;
};

export default function AdminCard({
title,
value,
description
}:Props){

return(

<div className="rounded-2xl border bg-white shadow-sm p-6">

<p className="text-gray-500 text-sm">

{title}

</p>

<h2 className="text-4xl font-bold mt-3">

{value}

</h2>

<p className="text-gray-500 mt-4">

{description}

</p>

</div>

);

}
