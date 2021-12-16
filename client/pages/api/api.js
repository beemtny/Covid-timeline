// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}

const BaseURL = 'http://localhost:8080';

export const insertEntry = async (jsonData) => {
  const response = await fetch(BaseURL + '/insertEntry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const deleteEntry = async (jsonData) => {
  console.log("delete payload: ", jsonData)
  const response = await fetch(BaseURL + '/deleteEntry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const fetchTimeline = async () => {
  const response = await fetch(BaseURL + '/queryTimeline', {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const ping = async () => {
  const response = await fetch(BaseURL + '/ping', {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
