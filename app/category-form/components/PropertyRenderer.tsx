import React from "react";
import Select, { SingleValue } from "react-select";
import { renderDropdownOptions } from "../hooks/helpers";
import { Option } from "../hooks/helpers";

interface Property {
  id: number;
  name: string;
  options: { id: number | string; name: string; child: boolean }[];
}

interface PropertyRendererProps {
  property: Property;
  childProperties: Record<number, Property[]>;
  onPropertyChange: (propertyId: number, value: SingleValue<Option>, hasChild: boolean) => void;
  depth?: number;
}

export const PropertyRenderer: React.FC<PropertyRendererProps> = ({
  property,
  childProperties,
  onPropertyChange,
  depth = 0,
}) => {
  const hasChild = property.options.some(o => o.child);
  
  return (
    <div key={property.id} className={`mb-4 ${depth > 0 ? 'ml-4 border-l-2 pl-4 border-gray-200' : ''}`}>
      <Select
        className="mb-2 text-[#000]"
        options={renderDropdownOptions(property.options, true)}
        onChange={(value) => onPropertyChange(property.id, value, hasChild)}
        placeholder={property.name}
      />
      
      {childProperties[property.id]?.map((childProp) => (
        <PropertyRenderer
          key={childProp.id}
          property={childProp}
          childProperties={childProperties}
          onPropertyChange={onPropertyChange}
          depth={depth + 1}
        />
      ))}
    </div>
  );
};