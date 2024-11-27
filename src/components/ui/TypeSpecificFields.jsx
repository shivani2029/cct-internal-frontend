import { FormControl, FormField, FormItem, FormMessage } from './form';
import PropTypes from 'prop-types';
import { Input } from './input';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { useState } from 'react';
import { Calendar } from './calendar';
import { format } from 'date-fns';
import { Checkbox } from './checkbox';
import { useFieldArray } from 'react-hook-form';
import { MultiSelect } from 'react-multi-select-component';

const TypeSpecificFields = ({
  selectedType,
  index,
  control,
  form,
  parentIndex,
}) => {
  const [open, setOpen] = useState(false);
  const [openMaxDate, setOpenMaxDate] = useState(false);

  const typeList = ['image', 'pdf', 'file', 'video'];

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: `sections[${parentIndex}].fields[${index}].metadata.options`,
  });
  const handleAddOptions = () => {
    const option = form.getValues(
      `sections[${parentIndex}].fields[${index}].metadata.option`,
    );

    if (option && typeof option === 'string' && option.trim() !== '') {
      const newOption = {
        value: option.trim(),
        id: undefined,
      };
      append(newOption);
      form.clearErrors(
        `sections[${parentIndex}].fields[${index}].metadata.option`,
      );

      form.setValue(
        `sections[${parentIndex}].fields[${index}].metadata.option`,
        '',
      );
    } else {
      form.setError(
        `sections[${parentIndex}].fields[${index}].metadata.option`,
        {
          message: 'Option cannot be empty',
        },
      );
    }
  };

  const handleDeleteOptions = optionIndex => {
    remove(optionIndex);
  };

  return (
    <>
      {selectedType === 'text' && (
        <>
          <p className="px-[30px]">Enter Text Input Value Below</p>
          <div className="grid grid-cols-5 gap-x-4 px-[30px] p-1">
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.allowRegex`}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 items-center justify-center">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={checked => field.onChange(checked)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.minLength`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Min. Length"
                      {...field}
                      type="number"
                      min={0}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.maxLength`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Max. Length"
                      type="number"
                      {...field}
                      min={0}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </>
      )}
      {selectedType === 'number' && (
        <>
          <p className="px-[30px]">Enter Number Value Below</p>
          <div className="grid grid-cols-5 gap-x-4 px-[30px] p-1">
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.min`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Min."
                      {...field}
                      type="number"
                      min={0}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.max`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Max."
                      {...field}
                      type="number"
                      min={0}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.minLength`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Min. Length"
                      {...field}
                      type="number"
                      min={0}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.maxLength`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Max. Length"
                      {...field}
                      type="number"
                      min={0}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </>
      )}

      {selectedType === 'email' && (
        <>
          <p className="px-[30px]">Enter Email Value Below</p>
          <div className="grid grid-cols-5 gap-x-4 px-[30px] p-1">
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.allowedDomain`}
              // name={`sections[${parentIndex}].fields[${index}].metadata.allowedDomain`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Domain address" {...field} />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </>
      )}

      {selectedType === 'date' && (
        <>
          <div className="grid grid-cols-2 gap-x-4 px-[30px] p-1">
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.minDate`}
              render={({ field, fieldState }) => {
                return (
                  <FormItem className="flex flex-col">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'primary'}
                            size={'lg'}
                            className={cn(
                              'pl-3 text-left font-normal bg-white placeholder:text-white/10 border border-input min-h-14',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), 'yyyy-MM-dd')
                            ) : (
                              <span className="text-muted-foreground">
                                Pick a date
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 border-0"
                        align="end"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={date => {
                            if (date) {
                              date.setHours(0, 0, 0, 0);
                              setOpen(false);
                              field.onChange(date.toString());
                            }
                          }}
                          initialFocus
                          className="bg-white"
                          disabled={date =>
                            date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                            date < new Date('')
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.maxDate`}
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <Popover open={openMaxDate} onOpenChange={setOpenMaxDate}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'primary'}
                            size={'lg'}
                            className={cn(
                              'pl-3 text-left font-normal bg-white placeholder:text-white/10 border border-input min-h-14',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), 'yyyy-MM-dd') // Change here too
                            ) : (
                              <span className="text-muted-foreground">
                                Pick a date
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 border-0"
                        align="end"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={date => {
                            if (date) {
                              date.setHours(0, 0, 0, 0);
                              setOpen(false);
                              field.onChange(date.toString());
                            }
                          }}
                          initialFocus
                          className="bg-white"
                          disabled={date =>
                            date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                            date < new Date('')
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </>
      )}

      {selectedType === 'select' && (
        <div className="px-[30px]">
          <p className="">Enter Select Value Below</p>
          <div className="grid grid-cols-3 gap-4 px-[30px] p-1">
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.allowMultiple`}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 items-center justify-center">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={checked => field.onChange(checked)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.minItems`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Min. Length"
                      {...field}
                      type="number"
                      min={0}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.maxItems`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Max. Length"
                      {...field}
                      type="number"
                      min={0}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2 mt-2">
            <div className="w-full">
              <FormField
                control={control}
                name={`sections[${parentIndex}].fields[${index}].metadata.option`}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter Options"
                        onChange={e => {
                          field.onChange(e);
                          if (e.target.value) {
                            form.clearErrors(
                              `sections[${parentIndex}].fields[${index}].metadata.option`,
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`sections[${parentIndex}].fields[${index}].metadata.options`}
                render={fieldState => (
                  <FormItem>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center">
              <Button type="button" onClick={handleAddOptions} className="h-12">
                + Add Options
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {/* {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center border border-border rounded-lg px-2 py-1"
              >
                <p>{field.value}</p>
                <Button
                  type="button"
                  variant="icon"
                  className="ml-2 rounded-full bg-white border border-border text-[20px] flex items-center p-1 pt-[6px] h-6 w-6 justify-center"
                  onClick={() => handleDeleteOptions(index)}
                >
                  ×
                </Button>
              </div>
            ))} */}
            {fields && fields.length > 0 ? (
              fields.map((field, index) => {
                const isObject =
                  typeof field === 'object' && field !== null && field.id;
                const displayValue = isObject
                  ? field.value ||
                    Object.entries(field)
                      .filter(([key]) => key !== 'id')
                      .map(([, value]) => value)
                      .join('')
                  : field;

                return (
                  <div
                    key={isObject ? field.id : index}
                    className="flex items-center border border-border rounded-lg px-2 py-1"
                  >
                    <p>{displayValue}</p>
                    <Button
                      type="button"
                      variant="icon"
                      className="ml-2 rounded-full bg-white border border-border text-[20px] flex items-center p-1 pt-[6px] h-6 w-6 justify-center"
                      onClick={() => handleDeleteOptions(index)}
                    >
                      ×
                    </Button>
                  </div>
                );
              })
            ) : (
              <p>No options available</p>
            )}
          </div>
        </div>
      )}

      {selectedType === 'radio' && (
        <div className="px-[30px]">
          <p className="">Enter Radio Value Below</p>
          <div className="flex gap-2 mt-2">
            <div className="w-full">
              <FormField
                control={control}
                name={`sections[${parentIndex}].fields[${index}].metadata.option`}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter Options"
                        onChange={e => {
                          field.onChange(e);
                          if (e.target.value) {
                            form.clearErrors(
                              `sections[${parentIndex}].fields[${index}].metadata.option`,
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`sections[${parentIndex}].fields[${index}].metadata.options`}
                render={fieldState => (
                  <FormItem>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center">
              <Button type="button" onClick={handleAddOptions} className="h-12">
                + Add Options
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center border border-border rounded-lg px-2 py-1"
              >
                <p>{field.value}</p>
                <Button
                  type="button"
                  variant="icon"
                  className="ml-2 rounded-full bg-white border border-border text-[20px] flex items-center p-1 pt-[6px] h-6 w-6 justify-center"
                  onClick={() => handleDeleteOptions(index)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedType === 'attachment' && (
        <>
          <p className="px-[30px]">Enter Attachment Value Below</p>
          <div className="grid grid-cols-5 gap-x-4 px-[30px] p-1">
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.allowedTypes`}
              render={({ field, fieldState }) => (
                <FormItem className="flex-1 mb-1">
                  <FormControl>
                    <MultiSelect
                      options={typeList.map(item => ({
                        label: item,
                        value: item,
                      }))}
                      value={(field.value || []).map(val => ({
                        value: val,
                        label: val,
                      }))}
                      onChange={selected => {
                        const selectedValues = selected.map(
                          option => option.value,
                        );
                        field.onChange(selectedValues || []);
                        form.setValue(
                          `sections[${parentIndex}].fields[${index}].metadata.allowedTypes`,
                          selectedValues || [],
                        );
                      }}
                      labelledBy="Select Allowed Types"
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.allowMultiple`}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 items-center justify-center">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={checked => field.onChange(checked)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.maxFileSize`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Size"
                      {...field}
                      type="number"
                      min={0}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </>
      )}

      {selectedType === 'checkbox' && (
        <div className="px-[30px]">
          <p className="">Enter Checkbox Value Below</p>
          <div className="grid grid-cols-5 gap-x-4  p-1">
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.allowMultiple`}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 items-center justify-center">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={checked => field.onChange(checked)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.minItems`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Min. Length" {...field} />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`sections[${parentIndex}].fields[${index}].metadata.maxItems`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Max. Length" {...field} />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2 mt-2">
            <div className="w-full">
              <FormField
                control={control}
                name={`sections[${parentIndex}].fields[${index}].metadata.option`}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter Options"
                        onChange={e => {
                          field.onChange(e);
                          if (e.target.value) {
                            form.clearErrors(
                              `sections[${parentIndex}].fields[${index}].metadata.option`,
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`sections[${parentIndex}].fields[${index}].metadata.options`}
                render={fieldState => (
                  <FormItem>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center">
              <Button type="button" onClick={handleAddOptions} className="h-12">
                + Add Options
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center border border-border rounded-lg px-2 py-1"
              >
                <p>{field.value}</p>
                <Button
                  type="button"
                  variant="icon"
                  className="ml-2 rounded-full bg-white border border-border text-[20px] flex items-center p-1 pt-[6px] h-6 w-6 justify-center"
                  onClick={() => handleDeleteOptions(index)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TypeSpecificFields;

TypeSpecificFields.propTypes = {
  selectedType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  control: PropTypes.object.isRequired,
  parentIndex: PropTypes.string,
  form: PropTypes.shape({
    getValues: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  }).isRequired,
};
