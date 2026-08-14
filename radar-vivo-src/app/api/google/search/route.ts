import { NextResponse } from "next/server";

import {
  searchGoogleBusiness,
} from "@/lib/google";

export async function GET(

  request: Request

) {

  const { searchParams } =

    new URL(request.url);

  const query =

    searchParams.get("q");

  if (!query) {

    return NextResponse.json(

      {

        error: "Query obrigatória"

      },

      {

        status: 400

      }

    );

  }

  try {

    const result =

      await searchGoogleBusiness(

        query

      );

    return NextResponse.json(

      result

    );

  }

  catch (error) {

    return NextResponse.json(

      {

        error:

          error instanceof Error

            ? error.message

            : "Erro interno"

      },

      {

        status: 500

      }

    );

  }

}
