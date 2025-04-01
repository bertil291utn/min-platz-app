interface PersonResponse {
  contribuyente: {
    nombreComercial: string;
    razonSocial: string;
    // Other fields may be added as needed
  };
  // Other API response fields
}

interface PersonName {
  firstName: string;
  lastName: string;
}

export async function fetchPersonInfo(ci: string): Promise<PersonName | null> {
  try {
    const response = await fetch(`https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porIdentificacion/${ci}`);
    
    if (response.status === 200) {
      const data: PersonResponse = await response.json();
      
      if (data.contribuyente && data.contribuyente.nombreComercial) {
        return parseFullName(data.contribuyente.nombreComercial);
      }
      
      // If we can't get a name from the API, return null
      return null;
    }
    
    // If API response is not 200, return null
    return null;
  } catch (error) {
    console.error('Error fetching person information:', error);
    return null;
  }
}

function parseFullName(fullName: string): PersonName {
  // The API returns first two last names followed by one or two first names
  // Split the full name by spaces
  const parts = fullName.trim().split(' ');
  
  if (parts.length < 2) {
    // If there's only one part, use it as firstName and empty lastName
    return {
      firstName: parts[0] || '',
      lastName: ''
    };
  }
  
  // Extract the first two parts as lastName (if available)
  const lastName = parts.slice(0, 2).join(' ');
  
  // The rest is the firstName
  const firstName = parts.slice(2).join(' ');
  
  return {
    firstName: firstName || '',
    lastName: lastName || ''
  };
} 