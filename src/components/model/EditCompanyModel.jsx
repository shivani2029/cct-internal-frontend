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
  createCompany,
  getCompanyById,
  updateCompany,
} from '@/services/company';
import { EditCompanySchema } from '@/lib/validators/CompanySchema';

const EditCompanyModel = ({ isOpenModal, setIsOpenModal, Id, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [loadingFormData, setLoadingFormData] = useState(false);
  const form = useForm({
    resolver: zodResolver(EditCompanySchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      websiteLink: '',
      noOfEmployees: '',
      address: '',
    },
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
        const res = await getCompanyById(Id);
        if (res) {
          form.reset({
            name: res.name || '',
            email: res.email || '',
            phoneNumber: res.phoneNumber || '',
            address: res.address || '',
            websiteLink: res.websiteLink || '',
            noOfEmployees: res.noOfEmployees || '',
          });
          setLoadingFormData(false);
        }
      } catch (error) {
        setLoadingFormData(false);
      }
    }
  };

  const handleCreateCompany = async data => {
    setLoading(true);
    try {
      const body = {
        email: data?.email,
        name: data.name,
        phoneNumber: data.phoneNumber,
        address: data.address,
        websiteLink: data.websiteLink,
        noOfEmployees: data.noOfEmployees,
      };
      await createCompany(body);
      toast.success('Bca created successfully');
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
        email: data?.email,
        name: data.name,
        phoneNumber: data.phoneNumber,
        address: data.address,
        websiteLink: data.websiteLink,
        noOfEmployees: data.noOfEmployees,
      };
      await updateCompany(id, body);
      toast.success('Bca updated successfully');
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
      await handleCreateCompany(formData);
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
              <div className="w-full grid grid-cols-1 gap-3">
                <div className="flex flex-col w-full justify-between md:p-1 max-sm:p-2">
                  <h3 className="text-xl font-semibold">Add Your Company</h3>
                  <p className="text-sm">Let’s add your Company</p>
                </div>
                <div className="max-h-[70vh] overflow-auto md:p-1 max-sm:p-2">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Company Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Email Address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Mobile Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />{' '}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Street Address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />{' '}
                    <FormField
                      control={form.control}
                      name="websiteLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Website Link" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="noOfEmployees"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="No. of Employee" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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

EditCompanyModel.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  Id: PropTypes.string,
};

export default EditCompanyModel;
