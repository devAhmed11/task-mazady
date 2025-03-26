export interface Option {
    value: number | string;
    label: string;
  }
  
  export const renderDropdownOptions = (
    options: { id: number | string; name: string }[],
    includeOther: boolean = false
  ): Option[] => {
    const dropdownOptions = options.map(opt => ({ value: opt.id, label: opt.name }));
    if (includeOther) dropdownOptions.push({ value: "other", label: "Other" });
    return dropdownOptions;
  };