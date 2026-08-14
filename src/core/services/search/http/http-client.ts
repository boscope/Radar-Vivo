export async function downloadPage(url:string){

    const response = await fetch(url,{

        headers:{

            "User-Agent":
            "Mozilla/5.0 RadarVivoBot"

        }

    });

    return await response.text();

}
