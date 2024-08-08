// src/app/utils/sendToGoogleSheets.js
export async function sendToGoogleSheets(data) {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxd003BGQsKBdj-qmX648bqnpAQDwVr3LXT2kS223cSEgSGc-6VJTxD_NG2y_Fr7YesIA/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  }
  