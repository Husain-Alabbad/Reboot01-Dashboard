import { profile } from "./profile.js";
import { showAlert, login } from "./login.js";

export const getData = async () => {
  showAlert("Loading...", "info");
  
  const endpoint = "https://learn.reboot01.com/api/graphql-engine/v1/graphql";

  const query = `
  query {
    user(limit: 1) {
      id
      login
      profile
      campus
      attrs
      firstName: attrs(path: "$.firstName")
      lastName: attrs(path: "$.lastName")
      email: attrs(path: "$.email")
      phoneNumber: attrs(path: "$.PhoneNumber")
      gender: attrs(path: "$.genders")
      dateOfBirth: attrs(path: "$.dateOfBirth")

      results(order_by: { grade: desc }, limit: 5) {
        object {
          name
        }
        grade
      }

      transactions(where: { type: { _eq: "xp" } }) {
        amount
      }

      xpHistory: transactions(
        where: { 
          _and: [
            { event: { path: { _eq: "/bahrain/bh-module" } } },
            { type: { _eq: "xp" } }
          ]
        }
        order_by: { createdAt: asc }
      ) {
        amount
        createdAt
      }

      totalXP: transactions(
        where: { event: { path: { _eq: "/bahrain/bh-module" } } }
        order_by: { createdAt: asc }
      ) {
        object {
          name
          attrs
          type
        }
        amount
        createdAt
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

      events(where: { event: { path: { _eq: "/bahrain/bh-module" } } }) {
        level
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