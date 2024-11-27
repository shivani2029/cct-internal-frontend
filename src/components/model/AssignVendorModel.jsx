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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { getAllVendor } from '@/services/vendor';
import { EditCheckRequest } from '@/lib/validators/checkRequest';
import { assignCheck } from '@/services/VendorCheck';

const AssignVendorModel = ({
  isOpenModal,
  setIsOpenModal,
  onSuccess,
  selectedRows,
}) => {
  const [loading, setLoading] = useState(false);
  const [vendor, setVendorData] = useState([]);
  const form = useForm({
    resolver: zodResolver(EditCheckRequest),
    defaultValues: {
      vendorId: '',
    },
  });

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const fetchData = async (page = 1) => {
    const limit = 7;

    try {
      const response = await getAllVendor(`&page=${page}&limit=${limit}`);
      setVendorData(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleCreateBca = async data => {
    setLoading(true);
    try {
      const body = {
        vendorId: data?.vendorId,
        checkIds: selectedRows,
      };
      await assignCheck(body);
      toast.success('Check assign successfully');
      onSuccess();
      resetForm();
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
    await handleCreateBca(formData);
  };

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitForm)}
            className="flex flex-col justify-evenly"
          >
            <div className="w-full grid grid-cols-1 gap-3">
              <div className="flex flex-col w-full justify-between md:p-1 max-sm:p-2">
                <h3 className="text-xl font-semibold">Assign Check Request</h3>
                <p className="text-sm">Let’s assign new check request</p>
              </div>
              <div className="max-h-[70vh] overflow-auto md:p-1 max-sm:p-2">
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="vendorId"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Vendor</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={value => {
                              field.onChange(value);
                            }}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={`Select vendor`} />
                            </SelectTrigger>
                            <SelectContent>
                              {vendor?.length > 0 ? (
                                vendor?.map(vendor => (
                                  <SelectItem
                                    key={vendor._id}
                                    value={vendor._id}
                                  >
                                    {vendor.name}
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="additional remarks" {...field} />
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
                    Assign
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

AssignVendorModel.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  Id: PropTypes.string,
  selectedRows: PropTypes.string,
};

export default AssignVendorModel;
