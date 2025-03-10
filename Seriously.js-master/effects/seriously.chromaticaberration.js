(function () {
    Seriously.plugin('chromaticaberration', {
        inputs: {
            source: {
                type: 'image'
            },
            amount: {
                type: 'number',
                uniform: 'amount',
                defaultValue: 0.01,
                min: 0,
                max: 0.05
            }
        },
        title: 'Chromatic Aberration',
        shader: function (inputs, shaderSource) {
            shaderSource.fragment = [
                'precision mediump float;',
                'varying vec2 vTexCoord;',
                'uniform sampler2D source;',
                'uniform float amount;',
                'void main(void) {',
                '    vec2 uv = vTexCoord;',
                '    vec2 rUV = uv + vec2(amount, 0.0);',
                '    vec2 bUV = uv - vec2(amount, 0.0);',
                '    if (rUV.x > 1.0 || rUV.x < 0.0) rUV.x = uv.x;', // Reset if out of bounds
                '    if (bUV.x > 1.0 || bUV.x < 0.0) bUV.x = uv.x;', // Reset if out of bounds
                '    vec4 r = texture2D(source, rUV);',
                '    vec4 g = texture2D(source, uv);',
                '    vec4 b = texture2D(source, bUV);',
                '    gl_FragColor = vec4(r.r, g.g, b.b, g.a);',
                '}'
            ].join('\n');
            return shaderSource;
        }
    });
})();