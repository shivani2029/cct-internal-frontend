import PropTypes from 'prop-types';
import { Button } from '../ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFieldArray } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Trash2 } from 'lucide-react';
import TypeSpecificFields from '../ui/TypeSpecificFields';

function NestedFields({ form, parentIndex, setSelectedTypes, selectedTypes }) {
  const sections = form.getValues('sections')?.[parentIndex] || { fields: [] };

  const { append: appendNested } = useFieldArray({
    // eslint-disable-next-line react/prop-types
    control: form.control,
    name: `sections.${parentIndex}.fields`,
  });
  const typeList = [
    { _id: 'text', name: 'Text' },
    { _id: 'number', name: 'Number' },
    { _id: 'email', name: 'Email' },
    { _id: 'date', name: 'Date' },
    { _id: 'select', name: 'Select' },
    { _id: 'attachment', name: 'Attachment' },
    { _id: 'radio', name: 'Radio' },
    { _id: 'checkbox', name: 'Checkbox' },
  ];
  const handleTypeChange = (value, index, parentIndex) => {
    setSelectedTypes(prevTypes => ({
      ...prevTypes,
      [`${parentIndex}-${index}`]: value,
    }));

    form.setValue(`sections.${parentIndex}.fields[${index}].type`, value);
  };
  const handleRemove = index => {
    const updatedSections = [...form.getValues('sections')];
    updatedSections[parentIndex].fields = updatedSections[
      parentIndex
    ].fields.filter((_, i) => i !== index);

    form.setValue('sections', updatedSections);
  };

  return (
    <div className="grid grid-cols-1 gap-4 col-span-4 mt-3">
      {sections?.fields &&
        sections?.fields?.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-3 rounded-sm">
            <div className="grid grid-cols-4 gap-x-4 p-1">
              <FormField
                // eslint-disable-next-line react/prop-types
                control={form.control}
                name={`sections[${parentIndex}].fields[${index}].label`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Field Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                // eslint-disable-next-line react/prop-types
                control={form.control}
                name={`sections[${parentIndex}].fields[${index}].type`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Select
                        onValueChange={value => {
                          field.onChange(value);
                          handleTypeChange(value, index, parentIndex);
                        }}
                        defaultValue={field.value}
                        value={field.value || ''}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {typeList?.length > 0 ? (
                            typeList?.map(type => (
                              <SelectItem key={type._id} value={type._id}>
                                {type.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem disabled>No type available</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                // eslint-disable-next-line react/prop-types
                control={form.control}
                name={`sections[${parentIndex}].fields[${index}].required`}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1 items-center justify-center">
                    <FormLabel className="text-sm font-semibold text-[#00000059]">
                      Required
                    </FormLabel>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={checked => field.onChange(checked)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {index !== 0 && (
                <div
                  className="flex flex-col gap-1 items-center justify-center cursor-pointer"
                  onClick={() => {
                    handleRemove(index);
                  }}
                >
                  <span className="text-sm font-semibold text-[#00000059]">
                    Delete
                  </span>
                  <Trash2 strokeWidth={1.5} size={18} />
                </div>
              )}
            </div>
            <TypeSpecificFields
              selectedType={selectedTypes[`${parentIndex}-${index}`]}
              index={index}
              // eslint-disable-next-line react/prop-types
              control={form.control}
              form={form}
              parentIndex={parentIndex}
            />
            <div className="border-b-2 border-b-input" />
          </div>
        ))}

      <Button
        type="button"
        className="mt-2 w-48"
        onClick={() =>
          appendNested({
            label: '',
            type: '',
            required: false, // Default values for a new field
          })
        }
      >
        + Add New Field
      </Button>
    </div>
  );
}
export default NestedFields;
NestedFields.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  parentIndex: PropTypes.string,
  form: PropTypes.shape({
    getValues: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }).isRequired,
  control: PropTypes.string.isRequired,
  setSelectedTypes: PropTypes.string,
  selectedTypes: PropTypes.string,
};
