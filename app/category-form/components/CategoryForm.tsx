'use client';
import React from "react";
import Select, { SingleValue } from "react-select";
import { useCategories } from "../hooks/useCategories";
import { useSubCategories } from "../hooks/useSubCategories";
import { useProperties } from "../hooks/useProperties";
import { usePropertySelection } from "../hooks/usePropertySelection";
import { PropertyRenderer } from "./PropertyRenderer";
import { Option, renderDropdownOptions } from "../hooks/helpers";

const CategoryForm: React.FC = () => {
  const [selectedMainCategory, setSelectedMainCategory] = React.useState<SingleValue<Option>>(null);
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<SingleValue<Option>>(null);
  
  const { categories } = useCategories();
  const { subCategories } = useSubCategories(selectedMainCategory?.value ?? null);
  const { properties } = useProperties(selectedSubCategory?.value ?? null);
  const { selectedProperties, childProperties, handlePropertyChange } = usePropertySelection();

  return (
    <div className="p-[200px]">
      <div className="">
        <Select
          className="mb-4  text-[#000]"
          options={renderDropdownOptions(categories)}
          onChange={setSelectedMainCategory}
          placeholder="Select Main Category"
        />

        <Select
          className="mb-4 text-[#000]"
          options={renderDropdownOptions(subCategories)}
          onChange={setSelectedSubCategory}
          placeholder="Select Sub Category"
          isDisabled={!selectedMainCategory}
        />

        {properties.map(property => (
          <PropertyRenderer
            key={property.id}
            property={property}
            childProperties={childProperties}
            onPropertyChange={handlePropertyChange}
          />
        ))}
      </div>

      <div className="flex items-center justify-center">
        <h2 className="text-xl font-bold mt-4">Selected Properties</h2>
        <table className="mt-4 w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-[#000]">Property</th>
              <th className="border px-4 py-2 text-[#000]">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(selectedProperties).map(([key, value]) => (
              <tr key={key}>
                <td className="border px-4 text-[#000] py-2">{key}</td>
                <td className="border px-4 text-[#000] py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryForm;