import {Chart} from "react-chartjs-2";

Chart.pluginService.register({
    beforeDraw: function(chart) {
        if (chart.config.options.elements.center) {
            // Get ctx from string
            let ctx = chart.chart.ctx;

            // Get options from the center object in options
            let centerConfig = chart.config.options.elements.center;
            let fontFamily = '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
            let txt = centerConfig.text;
            let color = centerConfig.color || '#000';
            let fontWeight = centerConfig.fontWeight || 500
            let maxFontSize = centerConfig.maxFontSize || 75;
            let sidePadding = centerConfig.sidePadding || 20;
            let sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)

            ctx.font = `${fontWeight} ${maxFontSize}px ${fontFamily}`;

            // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            let stringWidth = ctx.measureText(txt).width;
            let elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            let widthRatio = elementWidth / stringWidth;
            let newFontSize = Math.floor(30 * widthRatio);
            let elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
            let minFontSize = centerConfig.minFontSize;
            let lineHeight = centerConfig.lineHeight || 25;
            let wrapText = false;

            if (minFontSize === undefined) {
                minFontSize = 20;
            }

            if (minFontSize && fontSizeToUse < minFontSize) {
                fontSizeToUse = minFontSize;
                wrapText = true;
            }

            // Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            let centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            let centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = `${fontWeight} ${fontSizeToUse}px ${fontFamily}`;
            ctx.fillStyle = color;

            if (!wrapText) {
                ctx.fillText(txt, centerX, centerY);
                return;
            }

            let words = txt.split(' ');
            let line = '';
            let lines = [];

            // Break words up into multiple lines if necessary
            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = ctx.measureText(testLine);
                let testWidth = metrics.width;
                if (testWidth > elementWidth && n > 0) {
                    lines.push(line);
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }

            // Move the center up depending on line height and number of lines
            centerY -= (lines.length / 2) * lineHeight;

            for (let n = 0; n < lines.length; n++) {
                ctx.fillText(lines[n], centerX, centerY);
                centerY += lineHeight;
            }
            //Draw text in center
            ctx.fillText(line, centerX, centerY);
        }
    }
});