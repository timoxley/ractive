import { SECTION_UNLESS } from 'config/types';

export default function Mustache$init ( mustache, options ) {

	var ref, parentFragment, template;

	parentFragment = options.parentFragment;
	template = options.template;

	mustache.root           = parentFragment.root;
	mustache.parentFragment = parentFragment;
	mustache.pElement       = parentFragment.pElement;

	mustache.template       = options.template;
	mustache.index          = options.index || 0;
	mustache.isStatic       = options.template.s;

	mustache.type = options.template.t;

	var model = mustache.keypath = mustache.root.viewmodel.getModel( template, mustache );

	// TODO: this could just be a get, but notifyDependants calls
	// both setValue and setMembers. Could duplicate that bit, but
	// is there a better way to just to get? What about sections?
	if ( mustache.isStatic ) {
		model.notifyDependants( [mustache] );
	}
	else {
		model.register( mustache );
	}

	// Special case - inverted sections
	if ( mustache.template.n === SECTION_UNLESS && !mustache.hasOwnProperty( 'value' ) ) {
		mustache.setValue( undefined );
	}

}
