export class HTML {
    elements: string[] = [];
    // start = ``;
     start = `
    <!DOCTYPE html>
    <html>
    <body>
    `;

    end = ` 
    </body>
    </html> `;
    // end = ``;
    br = '<br>';
    add(v: string) {
        this.elements.push(v);
    }
    nbsp = (iterations: number = 1) => {
        var pattern = `&nbsp;`; var res: string = ''; while (iterations) {
            res += pattern;
            iterations--;
        }
        return res;
    };
    h1 = (v: string) => `<h1>${v}</h1>`;
    h2 = (v: string) => `<h2>${v}</h2>`;
    h3 = (v: string) => `<h3>${v}</h3>`;
    h4 = (v: string) => `<h4>${v}</h4>`;
    h5 = (v: string) => `<h5>${v}</h5>`;
    h6 = (v: string) => `<h6>${v}</h6>`;
    hr = () => `<hr style="border-top: 1px solid#0a551e;">`;
    style = (v: string) => `style="${v}"`;
    table = (v: string[] = [], style: any = null) => `<table ${style != null ? this.style(style) : ''} > ${v.join('')}</table>`;
    div = (v: string[] = [], style: any = null) => `<div ${style != null ? this.style(style) : ''} > ${v.join('')}</div>`;
    tr = (v: string[] = []) => `<tr>${v.join('')}</tr>`;
    td = (v: string[] = [], colspan = 1, style: any = null) => `<td colspan="${colspan}" ${style != null ? this.style(style + " font-family:  sans-serif; color: #0a551e; ") : this.style("font-family:  sans-serif; color: #0a551e; ")}>${v.join('')}</td>`;
    img = (v: string, width: number | string = 100, height: number | string = 100) => `<img src="${v}" width='${width}' height='${height}' alt="">`
    renderScreenHTML(): string {
        var result: string[] = [];
        result.push(this.start);
        this.elements.forEach((e) => {
            result.push(e);
        });
        result.push(this.end);
        return result.join('');
    }
    renderEmailHtml() {
        return this.elements.join('');
    }
}
