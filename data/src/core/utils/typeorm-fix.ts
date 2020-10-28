import { EntityMetadata, ObjectLiteral } from "typeorm";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";

/*
Fix for wrong metadata being used when using table inheritance with cascade actions.
Read more: https://github.com/typeorm/typeorm/issues/2544
*/

function getInverseEntityMetadata(value: any, relation: RelationMetadata): EntityMetadata {
	return relation.inverseEntityMetadata.childEntityMetadatas.find(metadata => {
		return metadata.name == value.constructor.name;
	}) 
	// if no childEntityMetadata found return value that is used originaly by typeorm
	?? relation.inverseEntityMetadata;
}

EntityMetadata.prototype.extractRelationValuesFromEntity = function(entity: ObjectLiteral, relations: RelationMetadata[]): [RelationMetadata, any, EntityMetadata][] {
	// Exact copy of extractRelationValuesFromEntity method, except we calling getInverseEntityMetadata
	// instead of using `relation.inverseEntityMetadata` which is incorrect for childEntity
	const relationsAndValues: [RelationMetadata, any, EntityMetadata][] = [];
	relations.forEach(relation => {
		const value = relation.getEntityValue(entity);
		if (Array.isArray(value)) 
			value.forEach(subValue => relationsAndValues.push([relation, subValue, /* BUGFIX*/getInverseEntityMetadata(subValue, relation)]));
		else if (value) 
			relationsAndValues.push([relation, value,  /* BUGFIX*/getInverseEntityMetadata(value, relation)]);
	});
	
	return relationsAndValues;
};