# ArtDraw
## SVG editor online - Vector drawing and graphics editor
![artdraw-svg-editor-online](https://user-images.githubusercontent.com/18316343/231035998-cbb07387-a6f7-4c38-9eed-c6a6248db99b.png)

This project uses javascript, HTML, to create a graphical editor for designing vector images in SVG format.
This project was not intended for use in NodeJS.

The central idea of the project is to create a simple editor that has a large number of tools that allow creating functional designs, like those made with commercial programs.

The project is in a continuous phase of development, this can be considered the initial version. There are still many tools to be developed, surely bugs to be corrected. This editor works on an SVG object, not Canvas. So the performance is not so perfect, but that doesn't mean it's not usable, or it's not capable of generating complex files. Still try not to abuse the nodes in the SVG paths.

## SVG Editor Tools

<table id='tb1'>
<tr><td><b>Left Bar Tools</b></td><td><b>Top Bar Tools</b></td></tr>
<tr>
<td valign='top'>
<ul>
  <li>Freehand pencil tool</li>
  <li>Polygon pencil tool</li>
  <li>Ovals Tool</li>
  <li>Rectangles Tool</li>
  <li>Text Tool</li>
  <li>Cliparts</li>
</ul>  
</td>
<td>
<ul>
  <li>File Menu Options</li>
  <li>Setttings</li>
  <li>Size Document</li>
  <li>Z.Order Shapes</li>
  <li>Mirror Tool</li>
  <li>Group Shapes</li>
  <li>Combine Shapes</li>
  <li>Grid align tool</li>
</ul>   
</td>
</tr></table>

<table>
<tr><td><b>Right Bar Tools and </b></td><td><b>Panels Assistants</b></td></tr>
<tr>
<td valign='top'>
<ul>
  <li>Arrays panel</li>
  <li>Edit nodes bezier</li>
  <li>Border Round</li>
  <li>Align Tool</li>
  <li>Boolean operations Tool</li>
  <li>Offset Tool</li>
</ul>  
</td>
<td valign='top'>
<ul>
  <li>Trace image to vectors</li>
  <li>Color and gradients panel</li>
  <li>Clip mask panel</li>
  <li>Rough style panel</li>
  <li>Backgrounds panel</li>
  <li>Filter effects panel</li>
</ul>  
</td>
</tr></table>

xxxxxxx

<table>
<tr>
<td><b>Freehand Pencil Tool</b></td>
<td><b>Polygon Pencil Tool</b></td></tr>
<tr>
<td valign='top'>
<img src='https://user-images.githubusercontent.com/18316343/231052382-411e6228-3099-437f-ba84-49832043d8be.gif' alt='Frehand tool'>
</td>
<td valign='top'>
<img src='https://user-images.githubusercontent.com/18316343/231053893-8b13d122-6c9b-4ebe-a044-66a08754c53e.gif' alt='Polygon tool'>
</td>
<tr>
<td>This is your typical freehand pencil tool. The smoothing factor is adjustable from configuration.</td>
<td>This Tool draws a polygon with straight segments. By clicking on the red starting point, it closes automatically.</tr>
<tr>
</tr></table>

xxxx

  <table>
<tr>
<td><b>Ovals Pencil Tool</b></td>
<td><b>Rectangle Pencil Tool</b></td></tr>
<tr>
<td valign='top'>
<img src='https://user-images.githubusercontent.com/18316343/231055225-21fa3eb7-0f10-481f-ab94-2086b8e7d4e3.gif' alt='Oval tool'>
</td>
<td valign='top'>
<img src='https://user-images.githubusercontent.com/18316343/231054796-6dbbdd9a-daf3-45ba-97e6-b35087d730b0.gif' alt='Rectangle tool'>
</td>
<tr>
<td>Simple and essential tool. Just draw circles starting from the center..</td>
<td>This tool makes rectangles, just rectangles and squares, and rectangles.</tr>
<tr>
</tr></table>

xxx

  <table>
<tr>
<td><b>Text Tool</b></td>
<td><b>Clipparts Tool</b></td></tr>
<tr>
<td valign='top'>
<img src='https://user-images.githubusercontent.com/18316343/231058186-1ec39380-6dbf-4a5c-9d1d-2f0b9daab66d.gif' alt='Text tool'>
</td>
<td valign='top'>
<img src='https://user-images.githubusercontent.com/18316343/231063618-67a40122-4e9c-46c3-ba0c-ad189dbb1813.gif' alt='Clipparts tool'>
</td>
<tr>
<td>The Text tool allows you to create 2 types. Simple <text> and vector text with the OpenType library. Artdraw includes more than 500 GoogleFonts.</td>
<td>Enter the clipparts gallery and select the design of your liking. Insert it to the document. Then you can modify size, colors, etc.</tr>
<tr>
</tr></table>







