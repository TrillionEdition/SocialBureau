
// /**
//  * Generate a Word document (.doc) from HTML content
//  * Uses the simple HTML-to-Word conversion technique
//  */
// export const downloadResumeAsWord = (element, fileName = 'resume') => {
//   if (!element) {
//     throw new Error('No element provided for Word generation');
//   }

//   // Basic HTML template for Word
//   const header = `
//     <html xmlns:o='urn:schemas-microsoft-com:office:office' 
//           xmlns:w='urn:schemas-microsoft-com:office:word' 
//           xmlns='http://www.w3.org/TR/REC-html40'>
//     <head>
//       <meta charset="utf-8">
//       <title>Resume</title>
//       <!--[if gte mso 9]>
//       <xml>
//         <w:WordDocument>
//           <w:View>Print</w:View>
//           <w:Zoom>100</w:Zoom>
//           <w:DoNotOptimizeForBrowser/>
//         </w:WordDocument>
//       </xml>
//       <![endif]-->
//       <style>
//         /* Basic Word-friendly styles */
//         body { font-family: 'Arial', sans-serif; line-height: 1.5; color: #333; }
//         .resume-container { padding: 20px; }
//         h1 { font-size: 24pt; margin-bottom: 10pt; color: #000; text-transform: uppercase; }
//         h2 { font-size: 14pt; margin-top: 15pt; margin-bottom: 10pt; color: #2563eb; border-bottom: 1pt solid #e5e7eb; padding-bottom: 3pt; text-transform: uppercase; }
//         h3 { font-size: 12pt; margin-top: 10pt; margin-bottom: 5pt; font-weight: bold; }
//         p { margin-bottom: 8pt; font-size: 11pt; }
//         .flex { display: block; }
//         .grid { display: block; }
//         .col-span-8, .col-span-4 { width: 100%; display: block; }
//         .flex-wrap { display: block; }
//         .gap-2 { margin-bottom: 5pt; }
//         .skill-tag { display: inline-block; padding: 2pt 5pt; background: #f3f4f6; margin-right: 5pt; margin-bottom: 5pt; font-size: 10pt; border: 1pt solid #e5e7eb; }
//         .experience-item { margin-bottom: 15pt; border-left: 2pt solid #e5e7eb; padding-left: 10pt; }
//         .duration { color: #9ca3af; font-size: 9pt; }
//       </style>
//     </head>
//     <body>
//       <div class="resume-container">
//         ${element.innerHTML}
//       </div>
//     </body>
//     </html>
//   `;

//   const blob = new Blob(['\ufeff', header], {
//     type: 'application/msword'
//   });

//   // Create a link and trigger download
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = `${fileName}.doc`;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// };
