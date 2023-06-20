import { Pass, FullScreenQuad } from './Pass.js';
import { OutputShader } from '../shaders/OutputShader.js';

class OutputPass extends Pass {

	constructor( toneMapping = NoToneMapping, toneMappingExposure = 1 ) {

		super();

		this.toneMapping = toneMapping;
		this.toneMappingExposure = toneMappingExposure;

		//

		const shader = OutputShader;

		this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

		this.material = new THREE.ShaderMaterial( {
			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader
		} );

		if ( toneMapping === THREE.LinearToneMapping ) this.material.defines.LINEAR_TONE_MAPPING = '';
		else if ( toneMapping === THREE.ReinhardToneMapping ) this.material.defines.REINHARD_TONE_MAPPING = '';
		else if ( toneMapping === THREE.CineonToneMapping ) this.material.defines.CINEON_TONE_MAPPING = '';
		else if ( toneMapping === THREE.ACESFilmicToneMapping ) this.material.defines.ACES_FILMIC_TONE_MAPPING = '';

		this.fsQuad = new FullScreenQuad( this.material );

	}

	render( renderer, writeBuffer, readBuffer/*, deltaTime, maskActive */ ) {

		this.uniforms[ 'tDiffuse' ].value = readBuffer.texture;
		this.uniforms[ 'toneMappingExposure' ].value = this.toneMappingExposure;

		if ( this.renderToScreen === true ) {

			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );
			if ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );
			this.fsQuad.render( renderer );

		}

	}

	dispose() {

		this.material.dispose();
		this.fsQuad.dispose();

	}

}

export { OutputPass };
