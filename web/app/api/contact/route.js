import { NextResponse } from 'next/server';

// Variables de entorno (en un entorno real, estas serían configuradas en .env)
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN || 'tu-token-de-whatsapp-api'; 
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || 'tu-phone-number-id';
const WHATSAPP_API_VERSION = 'v17.0'; // Versión actual de la API de WhatsApp

export async function POST(request) {
  try {
    // Obtener los datos del formulario
    const data = await request.json();
    
    // Validar datos requeridos
    if (!data.name || !data.email || !data.project || !data.message) {
      return NextResponse.json({ 
        success: false, 
        error: 'Por favor completa todos los campos requeridos' 
      }, { status: 400 });
    }
    
    // Formatear mensaje para WhatsApp
    const message = `*Nuevo contacto desde la web*\n\n*Nombre:* ${data.name}\n*Email:* ${data.email}\n*Empresa:* ${data.company || 'No especificada'}\n*Tipo de Proyecto:* ${data.project}\n*Mensaje:* ${data.message}`;
    
    // En un entorno de producción, esta sería la llamada real a la API de WhatsApp
    // En este entorno de desarrollo, simularemos una respuesta exitosa
    
    // NOTA: Este es el código para una implementación real con la API de WhatsApp Business
    /*
    const response = await fetch(`https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: "+18294790604", // El número al que se enviará el mensaje (WhatsApp Business)
        type: "text",
        text: {
          body: message
        }
      }),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error?.message || 'Error al enviar mensaje a WhatsApp');
    }
    */
    
    // Para desarrollo, simulamos una respuesta exitosa
    const simulatedResult = {
      messaging_product: "whatsapp",
      contacts: [
        {
          input: "+18294790604",
          wa_id: "18294790604"
        }
      ],
      messages: [
        {
          id: "wamid.HBgLMTg1OTUyNjIxNTUVAgARGBI5QURDNTQ1RkRDNkYzQjFDMjQA"
        }
      ]
    };
    
    // Registro para debugging
    console.log('Mensaje enviado a WhatsApp Business:', {
      to: '+18294790604',
      message,
      result: simulatedResult
    });
    
    // Enviar respuesta exitosa
    return NextResponse.json({ 
      success: true, 
      result: simulatedResult,
      message: 'Mensaje enviado correctamente a WhatsApp Business'
    });
    
  } catch (error) {
    console.error('Error al procesar solicitud de contacto:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Error interno del servidor' 
    }, { status: 500 });
  }
}
