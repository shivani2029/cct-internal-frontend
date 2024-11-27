import PropTypes from 'prop-types';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
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
import {
  createRoles,
  getAllPermission,
  getRolesById,
  updateRoles,
} from '@/services/roles';
import { MultiSelect } from 'react-multi-select-component';
import { RoleSchema } from '@/lib/validators/RolesSchema';

const EditRolesModel = ({ isOpenModal, setIsOpenModal, Id, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [loadingFormData, setLoadingFormData] = useState(false);
  const [permission, setPermission] = useState([]);
  const form = useForm({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      name: '',
      permission: [],
      type: '',
    },
  });
  const plateForm = [
    { _id: 'BCA', name: 'BCA' },
    { _id: 'Company', name: 'Company' },
    { _id: 'External_Vendor', name: 'External vendor' },
    { _id: 'FieldExecutive', name: 'Field Executive' },
    { _id: 'User', name: 'User' },
    { _id: 'DataEntry', name: 'Data Entry' },
  ];
  const handleClose = () => {
    setIsOpenModal(false);
  };

  const fetchData = async (page = 1) => {
    const limit = 7;

    try {
      const response = await getAllPermission(`&page=${page}&limit=${limit}`);
      setPermission(response?.docs);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchRoleById = async () => {
    if (Id) {
      try {
        setLoadingFormData(true);
        await form.reset({
          name: '',
          permission: [],
          type: '',
        });
        const res = await getRolesById(Id);
        if (res) {
          const formattedPermissions = res.permissions.map(
            permission => permission._id,
          );

          form.reset({
            name: res.name || '',
            permission: formattedPermissions,
            type: res.type || '',
          });

          setLoadingFormData(false);
        }
      } catch (error) {
        setLoadingFormData(false);
      }
    }
  };

  const handleCreateRoles = async data => {
    setLoading(true);
    try {
      const body = {
        name: data.name,
        permissions: data.permission,
        type: data.type,
      };
      await createRoles(body);
      toast.success('Role created successfully');
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
        name: data.name,
        permissions: data.permission,
        type: data.type,
      };
      await updateRoles(id, body);
      toast.success('Role updated successfully');
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
      await handleCreateRoles(formData);
    } else {
      await handleUpdate(Id, formData);
    }
  };

  useEffect(() => {
    if (Id === null) {
      form.reset({
        name: '',
        permission: [],
        type: '',
      });
    } else {
      fetchRoleById();
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
              <div className="w-full grid grid-cols-1 gap-3">
                <div className="flex flex-col w-full justify-between md:p-1 max-sm:p-2">
                  <h3 className="text-xl font-semibold">Add Role</h3>
                  <p className="text-sm">Let’s add new role</p>
                </div>
                <div className="max-h-[70vh] overflow-auto md:p-1 max-sm:p-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Role Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Select
                              onValueChange={value => {
                                field.onChange(value);
                              }}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={`Select Platform`} />
                              </SelectTrigger>
                              <SelectContent>
                                {plateForm?.length > 0 ? (
                                  plateForm?.map(plateForm => (
                                    <SelectItem
                                      key={plateForm._id}
                                      value={plateForm._id}
                                    >
                                      {plateForm.name}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem disabled>
                                    No plateform available
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
                      name="permission"
                      render={({ field, fieldState }) => (
                        <FormItem className="flex-1 mb-1">
                          <FormControl>
                            <MultiSelect
                              options={permission.map(item => ({
                                label: item.name,
                                value: item._id,
                              }))}
                              value={(field.value || [])
                                .map(val => {
                                  const match = permission.find(
                                    item => item._id === val,
                                  );
                                  return match
                                    ? { label: match.name, value: match._id }
                                    : null;
                                })
                                .filter(Boolean)}
                              onChange={selected => {
                                const selectedValues = selected.map(
                                  option => option.value,
                                );
                                field.onChange(selectedValues);
                              }}
                              labelledBy="Select Permission"
                            />
                          </FormControl>
                          <FormMessage>{fieldState.error?.message}</FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-5 justify-center mt-32">
                    <Button
                      variant="outline"
                      className="w-24"
                      type="button"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button className="w-24" type="submit" loading={loading}>
                      Submit
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

EditRolesModel.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  Id: PropTypes.string,
};

export default EditRolesModel;
