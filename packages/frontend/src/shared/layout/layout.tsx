import { ReactNode } from "react";
import { useQuery } from "@apollo/client";

import Header from "./header";
import { graphql } from "../../gql";
import { useUser } from "../providers/user-provider";

type TLayoutProps = {
  pageTitle?: string,
  children: ReactNode,
}

const layoutDataQuery = graphql(/* GraphQL */`
  query LayoutDataQuery {
    categories {
      code
    }
    cart {
      totalUnits
    }
  }
`);

function Layout(props: TLayoutProps) {
  const { userId } = useUser();
  const { data } = useQuery(layoutDataQuery, {
    context: {
      headers: {
        'Authorization': `Bearer ${userId}`
      }
    }
  });

  return (
    <>
      <Header
        categories={data?.categories || []}
        cartItemsCount={data?.cart?.totalUnits || 0}
      />

      {
        Boolean(props.pageTitle) &&
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{props.pageTitle}</h1>
          </div>
        </header>
      }

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {props.children}
      </main>
    </>
  )
}

export default Layout;
