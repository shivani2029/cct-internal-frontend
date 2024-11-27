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
import { BcaConfiguration } from '@/lib/validators/BcasSchema';
import { createBcaConfiguration } from '@/services/bca';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { MultiSelect } from 'react-multi-select-component';

const BcaConfigurationDetail = ({
  onSuccess,
  handlePrevStep,
  bcaId,
  setBcaConfigationId,
  bcaConfigurationData,
  setIsOpenModal,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingFormData, setLoadingFormData] = useState(false);

  const priorityTableColumns = [
    'Case Number',
    'Client Name',
    'Verification For',
    'Address',
    'Address 1',
    'Address 2',
    'Requested On',
    'Deadline Date',
    'Status',
    'ID',
    'Name',
    'Email',
    'City',
    'State',
    'Pincode',
  ];
  const caseTableColumns = [
    'Case Number',
    'Client Name',
    'Verification For',
    'Address',
    'Address 1',
    'Address 2',
    'Requested On',
    'Status',
    'Report Date',
    'Priority Setting',
    'Coordinator Name',
    'City',
    'State',
    'Pincode',
    'Name',
    'ID',
    'Email',
    'Company',
    'Payment-Status',
    'Invoice',
    'Priority Setting,Delete Request',
  ];
  const companyTableColumns = [
    'First Name',
    'Last Name',
    'Email',
    'Phone No',
    'Client Name',
    'Address 1',
    'Address 2',
    'City',
    'State',
    'Pincode',
  ];

  const form = useForm({
    resolver: zodResolver(BcaConfiguration),
    defaultValues: {
      appUrl: '',
      publicUserLink: '',
      userSignUp: '',
      vendorManagement: '',
      webForms: '',
      clientAlias: '',
      reportPrefix: '',
      priorityTableColumns: [],
      caseTableColumns: [],
      companyTableColumns: [],
      logoURL: '',
      tagLine: '',
    },
  });

  useEffect(() => {
    if (bcaConfigurationData) {
      const transformedData = {
        appUrl: bcaConfigurationData.appUrl,
        publicUserLink:
          bcaConfigurationData.enablePublicUserLink === true ? 'yes' : 'no',
        userSignUp: bcaConfigurationData.enableUserSignUp ? 'yes' : 'no',
        vendorManagement: bcaConfigurationData.enableVendorManagement
          ? 'yes'
          : 'no',
        webForms: bcaConfigurationData.enableWebForms ? 'yes' : 'no',
        clientAlias: bcaConfigurationData.clientAlias,
        reportPrefix: bcaConfigurationData.reportPrefix,
        priorityTableColumns: bcaConfigurationData.priorityTableColumns,
        caseTableColumns: bcaConfigurationData.caseTableColumns,
        companyTableColumns: bcaConfigurationData.companyTableColumns,
        logoURL: bcaConfigurationData.logoUrl,
        tagLine: bcaConfigurationData.tagLine,
      };
      setLoadingFormData(false);
      form.reset(transformedData);
    }
  }, [bcaConfigurationData]);
  const resetForm = () => {
    form.reset();
    setIsOpenModal(false);
  };
  const handleCreateBcaConfiguration = async data => {
    setLoading(true);
    try {
      const body = {
        appUrl: data?.appUrl,
        enablePublicUserLink: data?.publicUserLink === 'yes' ? true : false,
        enableUserSignUp: data?.data?.publicUserLink === 'yes' ? true : false,
        enableVendorManagement:
          data?.data?.publicUserLink === 'yes' ? true : false,
        enableWebForms: data?.webForms === 'yes' ? true : false,
        clientAlias: data?.clientAlias,
        reportPrefix: data?.reportPrefix,
        priorityTableColumns: data?.priorityTableColumns,
        caseTableColumns: data?.caseTableColumns,
        companyTableColumns: data?.companyTableColumns,
        logoUrl: data?.logoURL,
        tagLine: data?.tagLine,
      };
      const response = await createBcaConfiguration(body, bcaId);
      setBcaConfigationId(response?._id);
      toast.success('Bca Configuration updated successfully');
      onSuccess();
      resetForm();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForm = async formData => {
    // if (!Id) {
    await handleCreateBcaConfiguration(formData);
    // } else {
    //   await handleUpdate(Id, formData);
    // }
  };

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
                    name="appUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="App url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="publicUserLink"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Select
                            onValueChange={value => {
                              field.onChange(value);
                            }}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Public User Link" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes </SelectItem>
                              <SelectItem value="no">No </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="userSignUp"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Select
                            onValueChange={value => {
                              field.onChange(value);
                            }}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="User Sign up" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes </SelectItem>
                              <SelectItem value="no">No </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vendorManagement"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Select
                            onValueChange={value => {
                              field.onChange(value);
                            }}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Vendor Management" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes </SelectItem>
                              <SelectItem value="no">No </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="webForms"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Select
                            onValueChange={value => {
                              field.onChange(value);
                            }}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Webforms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes </SelectItem>
                              <SelectItem value="no">No </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientAlias"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Client Alias" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reportPrefix"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Report Prefix" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priorityTableColumns"
                    render={({ field, fieldState }) => (
                      <FormItem className="flex-1 mb-1">
                        <FormControl>
                          <MultiSelect
                            options={priorityTableColumns.map(item => ({
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
                              field.onChange(selectedValues);
                            }}
                            labelledBy="Priority Table Columns"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="caseTableColumns"
                    render={({ field, fieldState }) => (
                      <FormItem className="flex-1 mb-1">
                        <FormControl>
                          <MultiSelect
                            options={caseTableColumns.map(item => ({
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
                              field.onChange(selectedValues);
                            }}
                            labelledBy="Case Table Columns"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyTableColumns"
                    render={({ field, fieldState }) => (
                      <FormItem className="flex-1 mb-1">
                        <FormControl>
                          <MultiSelect
                            options={companyTableColumns.map(item => ({
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
                              field.onChange(selectedValues);
                            }}
                            labelledBy="Company Table Columns"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="logoURL"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Logo URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />{' '}
                  <FormField
                    control={form.control}
                    name="tagLine"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Tag Line" {...field} />
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
                    onClick={handlePrevStep}
                  >
                    Back
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
  );
};

BcaConfigurationDetail.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  Id: PropTypes.string,
  handlePrevStep: PropTypes.func.isRequired,
  bcaId: PropTypes.string,
  bcaConfigationId: PropTypes.string,
  setBcaConfigationId: PropTypes.string,
  bcaConfigurationData: PropTypes.object,
};

export default BcaConfigurationDetail;
