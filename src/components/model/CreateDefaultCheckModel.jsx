import PropTypes from 'prop-types';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';
import { Input } from '../ui/input';
import NestedFields from './NestedField';
import { Trash2 } from 'lucide-react';
import {
  createDefaultCheck,
  getCheckById,
  updateCheck,
} from '@/services/check';
import { format } from 'date-fns';
import DefaultCheckSchma from '@/lib/validators/defaultCheckSchema';

const CreateDefaultCheckModel = ({
  setIsOpenModal,
  isOpenModal,
  Id,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingFormData, setLoadingFormData] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState({});

  const form = useForm({
    resolver: zodResolver(DefaultCheckSchma),
    defaultValues: {
      formName: '',
      sections: [
        {
          name: '',
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
              },
            },
          ],
        },
      ],
    },
  });

  const {
    fields: parentFields,
    append: appendParent,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'sections',
  });

  const fetchBcaById = async () => {
    if (Id) {
      try {
        setLoadingFormData(true);
        await form.reset({
          name: '',
          email: '',
          phoneNumber: '',
          address: '',
          websiteLink: '',
          noOfEmployees: '',
        });
        const res = await getCheckById(Id);

        if (res) {
          form.reset({
            formName: res.formName,
            sections: res.sections.map((sections, parentIndex) => ({
              name: sections.name,
              fields: sections.fields.map((field, index) => {
                const fieldData = {
                  fieldId: toCamelCase(field.label),
                  label: field.label,
                  type: field.type,
                  required: field.required,
                };
                setSelectedTypes(prevTypes => ({
                  ...prevTypes,
                  [`${parentIndex}-${index}`]: field.type,
                }));
                if (field.metadata && Object.keys(field.metadata).length > 0) {
                  const metadata = { ...field.metadata };
                  if (Array.isArray(metadata.options)) {
                    metadata.options = metadata.options.map(
                      option => option.value,
                    ); // Extract only the `value` field as a string

                    if (metadata.options.length === 0) {
                      delete metadata.options;
                    }
                  }
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

                  [
                    'maxLength',
                    'minLength',
                    'min',
                    'max',
                    'minItems',
                    'maxItems',
                  ].forEach(key => {
                    if (metadata[key] !== undefined && metadata[key] !== '') {
                      metadata[key] = Number(metadata[key]);
                      if (isNaN(metadata[key])) delete metadata[key];
                    }
                  });

                  if (!metadata.allowRegex) delete metadata.allowRegex;

                  if (metadata.allowMultiple === '')
                    delete metadata.allowMultiple;

                  if (
                    metadata.maxFileSize !== undefined &&
                    metadata.maxFileSize !== ''
                  ) {
                    const num = Number(metadata.maxFileSize);
                    metadata.maxFileSize = isNaN(num) ? undefined : String(num);
                  }
                  ['minDate', 'maxDate', 'allowedDomain'].forEach(key => {
                    if (!metadata[key] || metadata[key].length === 0)
                      delete metadata[key];
                  });

                  fieldData.metadata = metadata;
                }

                return fieldData;
              }),
            })),
          });
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
  const handleCreateBcaCheck = async data => {
    setLoading(true);
    try {
      const body = {
        formName: data.formName,
        type: 'default',
        sections: data.sections.map(sections => ({
          name: sections.name,
          fields: sections.fields.map(field => {
            const fieldData = {
              fieldId: toCamelCase(field.label),
              label: field.label,
              type: field.type,
              required: field.required,
            };

            if (field.metadata && Object.keys(field.metadata).length > 0) {
              const metadata = { ...field.metadata };
              if (Array.isArray(metadata.options)) {
                metadata.options = metadata.options.map(option => option.value); // Extract only the `value` field as a string

                if (metadata.options.length === 0) {
                  delete metadata.options;
                }
              }
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

              [
                'maxLength',
                'minLength',
                'min',
                'max',
                'minItems',
                'maxItems',
              ].forEach(key => {
                if (metadata[key] !== undefined && metadata[key] !== '') {
                  metadata[key] = Number(metadata[key]);
                  if (isNaN(metadata[key])) delete metadata[key];
                }
              });

              if (!metadata.allowRegex) delete metadata.allowRegex;

              if (metadata.allowMultiple === '') delete metadata.allowMultiple;

              if (
                metadata.maxFileSize !== undefined &&
                metadata.maxFileSize !== ''
              ) {
                const num = Number(metadata.maxFileSize);
                metadata.maxFileSize = isNaN(num) ? undefined : String(num);
              }
              ['minDate', 'maxDate', 'allowedDomain'].forEach(key => {
                if (!metadata[key] || metadata[key].length === 0)
                  delete metadata[key];
              });

              fieldData.metadata = metadata;
            }

            return fieldData;
          }),
        })),
      };

      await createDefaultCheck(body);
      toast.success('Bca check created successfully');
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
      const body = {
        formName: data.formName,
        sections: data.sections.map(sections => ({
          name: sections.name,
          fields: sections.fields.map(field => ({
            fieldId: toCamelCase(field.label),
            label: field.label,
            type: field.type,
            required: field.required,
            metadata: { ...field.metadata },
          })),
        })),
      };
      await updateCheck(id, body);
      toast.success('Bca updated successfully');
      resetForm();
      onSuccess();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setIsOpenModal(false);
  };

  const handleSubmitForm = async formData => {
    if (!Id) {
      await handleCreateBcaCheck(formData);
    } else {
      await handleUpdate(Id, formData);
    }
  };

  useEffect(() => {
    if (Id === null) {
      form.reset({});
    } else {
      fetchBcaById();
    }
  }, [Id]);

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
      <div className="bg-white w-11/12 p-[20px] max-sm:p-[20px] md:max-w-2xl mx-auto rounded-lg shadow-lg z-50 overflow-y-auto flex flex-col">
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
              <div className="flex flex-col w-full justify-between md:p-1 max-sm:p-2">
                <h3 className="text-xl font-semibold">Create New Check</h3>
                <p className="text-sm">Let’s add new check</p>
              </div>
              <div className="w-full grid grid-cols-1 gap-3">
                <div className="max-h-[70vh] overflow-auto md:p-1 max-sm:p-2">
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="formName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Checks name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {parentFields.map((parentField, parentIndex) => (
                    <div
                      key={parentField.id}
                      className="border-2 rounded-sm p-4 my-4 flex flex-col gap-2 shadow-md"
                    >
                      <div className="flex justify-between">
                        <div className="font-semibold">
                          Section {parentIndex + 1}
                        </div>
                        {parentIndex != 0 && (
                          <div
                            className="flex  cursor-pointer justify-end "
                            onClick={() => remove(parentIndex)}
                          >
                            <div className="flex gap-1 items-center">
                              <span className="border-b border-transparent hover:border-input">
                                Delete
                              </span>{' '}
                              <Trash2 strokeWidth={1.5} size={18} />
                            </div>{' '}
                          </div>
                        )}
                      </div>
                      <FormField
                        // eslint-disable-next-line react/prop-types
                        control={form.control}
                        name={`sections[${parentIndex}].name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Section Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <NestedFields
                        form={form}
                        parentIndex={parentIndex}
                        selectedTypes={selectedTypes}
                        setSelectedTypes={setSelectedTypes}
                      />
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() =>
                        appendParent({
                          sections: [
                            {
                              fields: [
                                {
                                  label: '',
                                  type: '',
                                  required: false,
                                },
                              ],
                            },
                          ],
                        })
                      }
                    >
                      + Add Section
                    </Button>
                  </div>
                  <div className="flex gap-5 justify-center mt-10">
                    <Button
                      variant="outline"
                      className="w-24"
                      type="button"
                      onClick={() => setIsOpenModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="w-24" type="submit" loading={loading}>
                      Add BCA
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

CreateDefaultCheckModel.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  setIsOpenModal: PropTypes.bool.isRequired,
  Id: PropTypes.string,
  currentStep: PropTypes.number.isRequired,
  bcaId: PropTypes.string.isRequired,
  handlePrevStep: PropTypes.func.isRequired,
};

export default CreateDefaultCheckModel;
