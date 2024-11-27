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
import { EditBcasSchema } from '@/lib/validators/BcasSchema';
import { createBcas, getBcaById, updateBca } from '@/services/bca';

const BasicBcaDetailModel = ({
  setIsOpenModal,
  Id,
  onSuccess,
  setBcaId,
  setBcaConfigurationData,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingFormData, setLoadingFormData] = useState(false);

  const form = useForm({
    resolver: zodResolver(EditBcasSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      websiteLink: '',
      employeeCount: '',
      registrationNo: '',
      address1: '',
      address2: '',
      city: '',
      zipCode: '',
      state: '',
      country: '',
    },
  });

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const fetchBcaById = async () => {
    if (Id) {
      try {
        setLoadingFormData(true);
        await form.reset({
          name: '',
          email: '',
          phoneNumber: '',
          websiteLink: '',
          employeeCount: '',
          registrationNo: '',
          address1: '',
          address2: '',
          city: '',
          zipCode: '',
          state: '',
          country: '',
        });
        const res = await getBcaById(Id);

        if (res) {
          form.reset({
            name: res.name || '',
            email: res.email || '',
            phoneNumber: res.phoneNumber || '',
            address: res.address || '',
            websiteLink: res.websiteLink || '',
            employeeCount: res.employeeCount || '',
            registrationNo: res.companyRegistrationNumber || '',
            address1: res.addressLine1 || '',
            address2: res.addressLine2 || '',
            city: res.city || ' ',
            zipCode: res.zipCode || '',
            state: res.state || '',
            country: res.country || '',
          });
          setLoadingFormData(false);
        }
      } catch (error) {
        setLoadingFormData(false);
      }
    }
  };

  const handleCreateBca = async data => {
    setLoading(true);
    try {
      const body = {
        email: data?.email,
        name: data.name,
        phoneNumber: data.phoneNumber,
        address: data.address,
        websiteLink: data.websiteLink,
        employeeCount: data.employeeCount,
        companyRegistrationNumber: data.registrationNo,
        addressLine1: data.address1,
        addressLine2: data.address2,
        city: data.city,
        zipCode: data.zipCode,
        state: data.state,
        country: data.country,
      };
      const response = await createBcas(body);
      toast.success('Bca created successfully');
      setBcaConfigurationData(response?.data?.configurations);
      setBcaId(response?.data?._id);
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
        employeeCount: data.employeeCount,
        companyRegistrationNumber: data.registrationNo,
        addressLine1: data.address1,
        addressLine2: data.address2,
        city: data.city,
        zipCode: data.zipCode,
        state: data.state,
        country: data.country,
      };
      const response = await updateBca(id, body);
      setBcaId(response?.data?._id);
      toast.success('Bca updated successfully');
      setBcaConfigurationData(response?.data?.configurations);
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
  };

  const handleSubmitForm = async formData => {
    if (!Id) {
      await handleCreateBca(formData);
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
        websiteLink: '',
        employeeCount: '',
        registrationNo: '',
        address1: '',
        address2: '',
        city: '',
        zipCode: '',
        state: '',
        country: '',
      });
    } else {
      fetchBcaById();
    }
  }, [Id]);

  return (
    <div>
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
              <div className="max-h-[70vh] overflow-auto md:p-1 max-sm:p-2">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                    name="employeeCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Employee Count"
                            {...field}
                            type="number"
                            min={0}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registrationNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Company Registration Number"
                            {...field}
                            type="number"
                            min={0}
                          />
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
                    name="address1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Address line 1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />{' '}
                  <FormField
                    control={form.control}
                    name="address2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Address line 2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />{' '}
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Zip code"
                            {...field}
                            type="number"
                            min={0}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-5 justify-center my-10">
                  <Button
                    variant="outline"
                    className="w-24"
                    type="button"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button className="w-24" type="submit" loading={loading}>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

BasicBcaDetailModel.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  Id: PropTypes.string,
  currentStep: PropTypes.number.isRequired,
  setBcaId: PropTypes.string.isRequired,
  setBcaConfigurationData: PropTypes.object,
};

export default BasicBcaDetailModel;
