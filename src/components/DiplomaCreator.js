import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DiplomaCreator = () => {
  const [recipientName, setRecipientName] = useState("Juan Pérez");
  const [diplomaTitle, setDiplomaTitle] = useState("Diploma de Reconocimiento");
  const [diplomaDescription, setDiplomaDescription] = useState(
    "Por su destacada participación en el curso de React"
  );
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Fecha actual por defecto en formato YYYY-MM-DD
  const diplomaRef = useRef();

  const generatePDF = () => {
    const input = diplomaRef.current;

    // Verificar si el `input` no es nulo
    if (!input) {
      console.error("No se encontró el contenido del diploma.");
      return;
    }

    // Ajustamos el valor de scale en html2canvas para mejorar la calidad
    html2canvas(input, { scale: 4 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "mm", "letter"); // Tamaño carta en orientación horizontal

        // Tamaño de la hoja carta en orientación horizontal (279mm x 216mm)
        const imgWidth = 279; // Ancho en mm
        const imgHeight = 216; // Alto en mm

        // Ajustamos la imagen para que ocupe la página completa en tamaño carta horizontal
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight); // Añadir imagen con tamaño carta horizontal
        pdf.save("diploma.pdf");
      })
      .catch((error) => {
        console.error("Error al generar el PDF: ", error);
      });
  };

  return (
    <div className="diploma-container">
      <h1>Generador de Diplomas</h1>

      {/* Inputs para cambiar el nombre, título, descripción y fecha */}
      <div className="inputs-container">
        <label>
          Nombre del destinatario:
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Escribe el nombre del destinatario"
          />
        </label>

        <label>
          Título del diploma:
          <input
            type="text"
            value={diplomaTitle}
            onChange={(e) => setDiplomaTitle(e.target.value)}
            placeholder="Escribe el título del diploma"
          />
        </label>

        <label>
          Descripción del diploma:
          <input
            type="text"
            value={diplomaDescription}
            onChange={(e) => setDiplomaDescription(e.target.value)}
            placeholder="Escribe la descripción del diploma"
          />
        </label>

        <label>
          Fecha de emisión:
          <input
            type="date"
            value={issueDate} // Usar directamente el valor en formato YYYY-MM-DD
            onChange={(e) => setIssueDate(e.target.value)}
          />
        </label>
      </div>

      {/* Contenido del diploma */}
      <div ref={diplomaRef} className="diploma">
        <div className="border-decorative"></div> {/* Borde decorativo */}
        <div className="ribbon"></div>
        <div className="ribbon-bottom"></div>
        
        <h1>{diplomaTitle}</h1>
        <p>Con este diploma se reconoce que</p>
        <h2 className="recipient-name">{recipientName}</h2>
        <p>Ha sido reconocido por {diplomaDescription}</p>
        <p>Fecha de emisión: {issueDate}</p>

        {/* Sección de firma */}
        <div className="signature-container">
          <div className="signature">
            F.____________________<br />
            Nombre del firmante, Profesión
          </div>
        </div>
      </div>

      {/* Botón para generar el PDF */}
      <button className="generate-btn" onClick={generatePDF}>
        Generar PDF
      </button>
    </div>
  );
};

export default DiplomaCreator;
