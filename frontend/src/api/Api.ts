const getDocuments = async () =>
    (await fetch('/api/getDocuments')).text();

const addDocument = async (day: string, chore: string, personInCharge: string, blame: string, done: boolean) => {
  const documentToInsert = {
    day: day,
    chore: chore,
    personInCharge: personInCharge,
    blame: blame,
    done: done
  };

  const response = await fetch('/api/addDocument', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(documentToInsert),
  });

  return response.json();
};

const Api = {
  getDocuments,
  addDocument,
};

export default Api;
