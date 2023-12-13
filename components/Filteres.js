export const presets = [
    { name: 'Original', code: ``, },
    {
        name: 'Solar',
        code: `.filterParent{position:relative}.filterParent:after{position:absolute;content:'';display:block;top:0;left:0;height:100%;width:100%;background:linear-gradient(to bottom,rgba(20,0,255,.65) 0,rgba(0,188,255,.4) 100%);mix-blend-mode:exclusion}`,
    },
    {
        name: 'Seafoam',
        code: `.filterParent{position:relative}.filterParent:after{position:absolute;content:'';display:block;top:0;left:0;height:100%;width:100%;background:linear-gradient(to bottom,#00ff54 0,#003dff 100%);mix-blend-mode:color}`,
    },
    {
        name: 'Lofi',
        code: `.filterParent{position:relative}.filterParent:after{position:absolute;content:'';display:block;top:0;left:0;height:100%;width:100%;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 0,rgba(34,34,34,.99) 100%);mix-blend-mode:multiply}`,
    },
]