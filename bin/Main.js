"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicXMLParser_1 = require("Parsers/MusicXMLParser");
const SVGEngraver_1 = require("Engravers/SVGEngraver");
function Main() {
    // fetch('../../var/Accidentals.xml')
    //     .then(response => response.text())
    //     .then((xmlString) => {
    //         let score = MusicXMLParser.parse(xmlString);
    //         let musicalElement = SVGEngraver.engrave(score);
    //
    //         document.body.appendChild(musicalElement);
    //         document.body.appendChild(document.createElement('br'));
    //         document.body.appendChild(document.createElement('br'));
    //     });
    //
    //
    // fetch('../../var/Beams.xml')
    //     .then(response => response.text())
    //     .then((xmlString) => {
    //         let score = MusicXMLParser.parse(xmlString);
    //         let musicalElement = SVGEngraver.engrave(score);
    //
    //         document.body.appendChild(musicalElement);
    //         document.body.appendChild(document.createElement('br'));
    //         document.body.appendChild(document.createElement('br'));
    //     });
    //
    //
    // fetch('../../var/HelloWorld.xml')
    //     .then(response => response.text())
    //     .then((xmlString) => {
    //         let score = MusicXMLParser.parse(xmlString);
    //         let musicalElement = SVGEngraver.engrave(score);
    //
    //         document.body.appendChild(musicalElement);
    //         document.body.appendChild(document.createElement('br'));
    //         document.body.appendChild(document.createElement('br'));
    //     });
}
function renderXML(address) {
    document.addEventListener('DOMContentLoaded', () => {
        fetch(address)
            .then(response => response.text())
            .then((xmlString) => {
            let score = MusicXMLParser_1.MusicXMLParser.parse(xmlString);
            let musicalElement = SVGEngraver_1.SVGEngraver.engrave(score);
            document.body.appendChild(musicalElement);
            document.body.appendChild(document.createElement('br'));
            document.body.appendChild(document.createElement('br'));
        });
    });
}
exports.renderXML = renderXML;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQXdEO0FBQ3hELHVEQUFvRDtBQUVwRDtJQUNJLHFDQUFxQztJQUNyQyx5Q0FBeUM7SUFDekMsNkJBQTZCO0lBQzdCLHVEQUF1RDtJQUN2RCwyREFBMkQ7SUFDM0QsRUFBRTtJQUNGLHFEQUFxRDtJQUNyRCxtRUFBbUU7SUFDbkUsbUVBQW1FO0lBQ25FLFVBQVU7SUFDVixFQUFFO0lBQ0YsRUFBRTtJQUNGLCtCQUErQjtJQUMvQix5Q0FBeUM7SUFDekMsNkJBQTZCO0lBQzdCLHVEQUF1RDtJQUN2RCwyREFBMkQ7SUFDM0QsRUFBRTtJQUNGLHFEQUFxRDtJQUNyRCxtRUFBbUU7SUFDbkUsbUVBQW1FO0lBQ25FLFVBQVU7SUFDVixFQUFFO0lBQ0YsRUFBRTtJQUNGLG9DQUFvQztJQUNwQyx5Q0FBeUM7SUFDekMsNkJBQTZCO0lBQzdCLHVEQUF1RDtJQUN2RCwyREFBMkQ7SUFDM0QsRUFBRTtJQUNGLHFEQUFxRDtJQUNyRCxtRUFBbUU7SUFDbkUsbUVBQW1FO0lBQ25FLFVBQVU7QUFDZCxDQUFDO0FBRUQsbUJBQTBCLE9BQWU7SUFDckMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtRQUMvQyxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ2hCLElBQUksS0FBSyxHQUFHLCtCQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVDLElBQUksY0FBYyxHQUFHLHlCQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWhELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4RCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFiRCw4QkFhQyJ9