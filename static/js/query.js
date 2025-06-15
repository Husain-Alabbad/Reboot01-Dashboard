import { profile } from "./profile.js";
import { showAlert, login } from "./login.js";

export const getData = async () => {
  showAlert("Loading...", "info");
  
  const endpoint = "https://learn.reboot01.com/api/graphql-engine/v1/graphql";

  const query = `
  query {
    event(where: { id: { _eq: 72 } }) {
      object {
        attrs
      }
    }

    user {
      id
      profile
      campus
      login
      attrs

      results(order_by: { grade: desc }, limit: 5) {
        object {
          name
        }
        grade
      }

      transactions(where: { type: { _eq: "xp" } }) {
        amount
      }

      events(where: { eventId: { _eq: 72 } }) {
        level
      }

      xpHistory: transactions(
        where: { 
          _and: [
            { eventId: { _eq: 72 } },
            { type: { _eq: "xp" } }
          ]
        }
        order_by: { createdAt: asc }
      ) {
        amount
        createdAt
      }

      totalXP: transactions(
        where: { eventId: { _eq: 72 } },
        order_by: { createdAt: asc }
      ) {
        object {
          name
          attrs
          type
        }
        amount
        createdAt
        eventId
        path
        type
      }

      upTransactions: transactions(where: { type: { _eq: "up" } }) {
        amount
      }

      downTransactions: transactions(where: { type: { _eq: "down" } }) {
        amount
      }

      xpTimeline: transactions(
        where: { type: { _eq: "xp" } }
        order_by: { createdAt: asc }
      ) {
        amount
        createdAt
      }

      skillTypes: transactions_aggregate(
        distinct_on: [type]
        where: { type: { _nin: ["xp", "level", "up", "down"] } }
        order_by: [{ type: asc }, { amount: desc }]
      ) {
        nodes {
          type
          amount
        }
      }
    }
  }
`;





  try {
    let response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error("Session expired. Please login again.");
    }
    const data = await response.json();
    console.log("GraphQL Response:", data);
    profile(data);
  } catch (error) {
    login();
    showAlert(`Error: ${error}`);
  }

}


