import PropTypes from 'prop-types';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Trash2 } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import TypeSpecificFields from '../ui/TypeSpecificFields';
import FormBuilderSchema from '@/lib/validators/FormBuilderSchema';
import { createCheck, getCheckById, updateCheck } from '@/services/check';
import { format } from 'date-fns';

const EditNewFormForChecksModel = ({
  isOpenModal,
  setIsOpenModal,
  Id,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingFormData, setLoadingFormData] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState({});

  const form = useForm({
    resolver: zodResolver(FormBuilderSchema),
    defaultValues: {
      title: '',
      fields: [
        {
          label: '',
          type: '',
          required: false,
          metadata: {
            min: undefined,
            max: undefined,
            minLength: undefined,
            maxLength: undefined,
            minItems: undefined,
            maxItems: undefined,
            allowedTypes: [],
          },
        },
      ],
    },
  });

  const handleTypeChange = (value, index) => {
    setSelectedTypes(prevTypes => ({
      ...prevTypes,
      [index]: value,
    }));
    form.setValue(`fields.${index}.type`, value);
  };
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

  const fetchFormById = async () => {
    if (Id) {
      try {
        setLoadingFormData(true);
        await form.reset({
          title: '',
          email: '',
          phoneNumber: '',
          address: '',
          websiteLink: '',
          noOfEmployees: '',
        });
        const res = await getCheckById(Id);
        if (res) {
          const newType = {};
          form.reset({
            title: res.formName || '',
            fields:
              res?.fields?.map((field, index) => {
                newType[index] = field?.type;
                return {
                  label: field?.label,
                  type: field?.type,
                  required: field?.required,
                  metadata: {
                    ...field?.metadata,
                  },
                };
              }) || [],
          });

          setSelectedTypes(newType);
          setLoadingFormData(false);
        }
      } catch (error) {
        setLoadingFormData(false);
      }
    }
  };
  function toCamelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase(),
      )
      .replace(/\s+/g, '');
  }

  const handlecreateCheck = async data => {
    setLoading(true);
    try {
      const requestBody = {
        formName: data.title,
        fields: data.fields.map(field => {
          const fieldData = {
            label: field.label,
            fieldId: toCamelCase(field.label),
            type: field.type,
            required: field.required,
          };

          if (field.metadata && Object.keys(field.metadata).length > 0) {
            const metadata = { ...field.metadata };

            if (metadata.minDate) {
              metadata.minDate = format(
                new Date(metadata.minDate),
                'yyyy-MM-dd',
              );
            }

            if (metadata.maxDate) {
              metadata.maxDate = format(
                new Date(metadata.maxDate),
                'yyyy-MM-dd',
              );
            }

            if (metadata.maxLength !== undefined && metadata.maxLength !== '') {
              metadata.maxLength = Number(metadata.maxLength);
              if (isNaN(metadata.maxLength)) delete metadata.maxLength;
            }

            if (metadata.minLength !== undefined && metadata.minLength !== '') {
              metadata.minLength = Number(metadata.minLength);
              if (isNaN(metadata.minLength)) delete metadata.minLength;
            }

            if (metadata.allowRegex && metadata.allowRegex === '')
              delete metadata.allowRegex;

            if (metadata.min !== undefined && metadata.min !== '') {
              metadata.min = Number(metadata.min);
              if (isNaN(metadata.min)) delete metadata.min;
            }

            if (metadata.max !== undefined && metadata.max !== '') {
              metadata.max = Number(metadata.max);
              if (isNaN(metadata.max)) delete metadata.max;
            }

            if (metadata.minItems !== undefined && metadata.minItems !== '') {
              metadata.minItems = Number(metadata.minItems);
              if (isNaN(metadata.minItems)) delete metadata.minItems;
            }

            if (metadata.maxItems !== undefined && metadata.maxItems !== '') {
              metadata.maxItems = Number(metadata.maxItems);
              if (isNaN(metadata.maxItems)) delete metadata.maxItems;
            }
            if (metadata.allowMultiple && metadata.allowMultiple === '')
              delete metadata.allowMultiple;

            if (
              metadata.maxFileSize !== undefined &&
              metadata.maxFileSize !== ''
            ) {
              const num = Number(metadata.maxFileSize);

              if (isNaN(num)) {
                delete metadata.maxFileSize;
              } else {
                metadata.maxFileSize = String(num);
              }
            }

            if (!metadata.allowedTypes || metadata.allowedTypes.length === 0) {
              metadata.allowedTypes = [];
            }

            if (metadata.minDate && metadata.minDate === '')
              delete metadata.minDate;
            if (metadata.maxDate && metadata.maxDate === '')
              delete metadata.maxDate;
            if (metadata.allowedDomain && metadata.allowedDomain === '')
              delete metadata.allowedDomain;
            if (metadata.options && metadata.options.length === 0)
              delete metadata.options;
            fieldData.metadata = metadata;
          }

          return fieldData;
        }),
      };
      await createCheck(requestBody);
      toast.success('Form created successfully');
      onSuccess();
      resetForm();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, data) => {
    setLoading(true);
    try {
      const requestBody = {
        formName: data.title,
        fields: data.fields.map(field => {
          const fieldData = {
            label: field.label,
            fieldId: toCamelCase(field.label),
            type: field.type,
            required: field.required,
          };

          if (field.metadata && Object.keys(field.metadata).length > 0) {
            const metadata = { ...field.metadata };

            if (metadata.minDate) {
              metadata.minDate = format(
                new Date(metadata.minDate),
                'yyyy-MM-dd',
              );
            }

            if (metadata.maxDate) {
              metadata.maxDate = format(
                new Date(metadata.maxDate),
                'yyyy-MM-dd',
              );
            }

            if (metadata.maxLength !== undefined && metadata.maxLength !== '') {
              metadata.maxLength = Number(metadata.maxLength);
              if (isNaN(metadata.maxLength)) delete metadata.maxLength;
            }

            if (metadata.minLength !== undefined && metadata.minLength !== '') {
              metadata.minLength = Number(metadata.minLength);
              if (isNaN(metadata.minLength)) delete metadata.minLength;
            }

            if (metadata.allowRegex && metadata.allowRegex === '')
              delete metadata.allowRegex;

            if (metadata.min !== undefined && metadata.min !== '') {
              metadata.min = Number(metadata.min);
              if (isNaN(metadata.min)) delete metadata.min;
            }

            if (metadata.max !== undefined && metadata.max !== '') {
              metadata.max = Number(metadata.max);
              if (isNaN(metadata.max)) delete metadata.max;
            }

            if (metadata.minItems !== undefined && metadata.minItems !== '') {
              metadata.minItems = Number(metadata.minItems);
              if (isNaN(metadata.minItems)) delete metadata.minItems;
            }

            if (metadata.maxItems !== undefined && metadata.maxItems !== '') {
              metadata.maxItems = Number(metadata.maxItems);
              if (isNaN(metadata.maxItems)) delete metadata.maxItems;
            }
            if (metadata.allowMultiple && metadata.allowMultiple === '')
              delete metadata.allowMultiple;

            if (
              metadata.maxFileSize !== undefined &&
              metadata.maxFileSize !== ''
            ) {
              const num = Number(metadata.maxFileSize);

              if (isNaN(num)) {
                delete metadata.maxFileSize;
              } else {
                metadata.maxFileSize = String(num);
              }
            }

            if (!metadata.allowedTypes || metadata.allowedTypes.length === 0) {
              metadata.allowedTypes = [];
            }

            if (metadata.minDate && metadata.minDate === '')
              delete metadata.minDate;
            if (metadata.maxDate && metadata.maxDate === '')
              delete metadata.maxDate;
            if (metadata.allowedDomain && metadata.allowedDomain === '')
              delete metadata.allowedDomain;
            if (metadata.options && metadata.options.length === 0)
              delete metadata.options;
            fieldData.metadata = metadata;
          }

          return fieldData;
        }),
      };
      await updateCheck(id, requestBody);
      toast.success('Form updated successfully');
      resetForm();
      onSuccess();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setIsOpenModal(false);
  };

  const resetForm = () => {
    form.reset();
    setIsOpenModal(false);
  };

  const handleSubmitForm = async formData => {
    if (!Id) {
      await handlecreateCheck(formData);
    } else {
      await handleUpdate(Id, formData);
    }
  };
  useEffect(() => {
    if (Id === null) {
      form.reset({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        websiteLink: '',
        noOfEmployees: '',
      });
    } else {
      fetchFormById();
    }
  }, [Id]);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'fields',
  });
  return (
    <div
      className={`${
        isOpenModal ? 'block' : 'hidden'
      } fixed inset-0 z-50 flex justify-center items-center`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="bg-white py-[30px] w-11/12 max-sm:p-[20px] md:max-w-3xl mx-auto rounded-lg shadow-lg z-50 overflow-y-auto flex flex-col">
        {loadingFormData ? (
          <div className="flex justify-center items-center h-96">
            <LoaderIcon className="animate-spin" />
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitForm)}
              className="flex flex-col justify-evenly"
            >
              <div className="w-full grid grid-cols-1 gap-3">
                <div className="flex flex-col w-full justify-between px-[30px]">
                  <h3 className="text-xl font-medium">Create New Form</h3>
                  <p className="text-sm">Let’s add new form</p>
                </div>
                <div className="max-h-[70vh] overflow-auto md:p-1 max-sm:p-2">
                  <div
                    className={`flex justify-between gap-4 px-[30px] p-3 ${fields.length !== 0 && 'border-b-2 border-b-input'}`}
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Form Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      className="w-[140px] flex items-center gap-1 max-sm:mb-5"
                      onClick={() => {
                        append({
                          label: '',
                          type: '',
                        });
                      }}
                    >
                      + Add New Field
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 col-span-4 mt-3">
                    {fields &&
                      fields?.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex flex-col gap-3 rounded-sm"
                        >
                          <div className="grid grid-cols-5 gap-x-4 px-[30px] p-1">
                            <FormField
                              control={form.control}
                              name={`fields.${index}.label`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Field Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`fields.${index}.type`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Select
                                      onValueChange={value => {
                                        field.onChange(value);
                                        handleTypeChange(value, index);
                                      }}
                                      defaultValue={field.value}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {typeList?.length > 0 ? (
                                          typeList?.map(category => (
                                            <SelectItem
                                              key={category._id}
                                              value={category._id}
                                            >
                                              {category.name}
                                            </SelectItem>
                                          ))
                                        ) : (
                                          <SelectItem disabled>
                                            No categories available
                                          </SelectItem>
                                        )}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`fields.${index}.required`}
                              render={({ field }) => (
                                <FormItem className="flex flex-col gap-1 items-center justify-center">
                                  <FormLabel className="text-sm font-semibold text-[#00000059]">
                                    Required
                                  </FormLabel>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={checked =>
                                      field.onChange(checked)
                                    }
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {index !== 0 && (
                              <div
                                className="flex flex-col gap-1 items-center justify-center cursor-pointer"
                                onClick={() => remove(index)}
                              >
                                <span className="text-sm font-semibold text-[#00000059]">
                                  Delete
                                </span>
                                <Trash2 strokeWidth={1.5} size={18} />
                              </div>
                            )}
                          </div>
                          <TypeSpecificFields
                            selectedType={selectedTypes[index]}
                            index={index}
                            control={form.control}
                            form={form}
                          />
                          <div className="border-b-2 border-b-input" />
                        </div>
                      ))}
                  </div>
                  <div className="flex gap-5 justify-center mt-10">
                    <Button
                      variant="outline"
                      className="w-24"
                      type="button"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button className="w-32" type="submit" loading={loading}>
                      Create Form
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

EditNewFormForChecksModel.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  Id: PropTypes.string,
};

export default EditNewFormForChecksModel;
