define(['config/booleanAttributes'],function (booleanAttributes) {

	'use strict';
	
	return function Attribute$updateEverythingElse () {
		var node = (fragment = this).node, namespace = fragment.namespace, name = fragment.name, value = fragment.value, fragment = fragment.fragment;
	
		if ( namespace ) {
			node.setAttributeNS( namespace, name, (fragment || value).toString() );
		}
	
		else if ( !booleanAttributes.test( name ) ) {
			node.setAttribute( name, (fragment || value).toString() );
		}
	
		// Boolean attributes - truthy becomes '', falsy means 'remove attribute'
		else {
			if ( value ) {
				node.setAttribute( name, '' );
			} else {
				node.removeAttribute( name );
			}
		}
	};

});