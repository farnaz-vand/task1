import { useState } from 'react';
import type { FC } from 'react';
import {
  Box,
  Button,
  Typography,
  Collapse,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Grid,
  List,
  ListItem,
} from '@mui/material';
import { useFormik } from 'formik';
import AlertBox from './components/AlertBox';
import SOCIAL_MEDIA_TYPES from './constants';
import getIcon from './utils/getIcon';

interface SocialMediaListType {
  id: string;
  link: string;
  type: string;
}

const App: FC = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openAlertBox, setOpenAlertBox] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [socialMediaList, setSocialMediaList] = useState<SocialMediaListType[]>([{ id: 'test@test', link: 'https://google.com', type: 'instagram' }]);
  const [currentItemId, setCurrentItemId] = useState<string>('');

  const handleOpenForm = (): void => {
    setOpenForm(true);
  };

  const handleCloseForm = (): void => {
    setOpenForm(false);
  };

  const toggleOpenForm = (): void => {
    setOpenForm(!openForm);
  };

  const closeAlertBox = (): void => {
    setOpenAlertBox(false);
  };

  const addListItem = (values: SocialMediaListType): void => {
    const found = socialMediaList.some(
      (item) => item.id === values.id || item.link === values.link || item.type === values.type,
    );
    // TODO: handle validation with formik
    const isOneValueEmpty = values.id === '' || values.link === '' || values.type === '';

    if (!found && !isOneValueEmpty) {
      setSocialMediaList(
        [...socialMediaList, { id: values.id, link: values.link, type: values.type }],
      );
    }
  };

  const editListItem = (values: SocialMediaListType): void => {
    const newSocialMediaList = [...socialMediaList];
    const foundIndex = socialMediaList.findIndex((item) => item.id === currentItemId);

    newSocialMediaList[foundIndex] = {
      id: values.id,
      link: values.link,
      type: values.type,
    };

    setSocialMediaList(newSocialMediaList);
    setIsEditing(false);
  };

  const deleteButtonClick = (id: string): void => {
    setCurrentItemId(id);
    setOpenAlertBox(true);
  };

  const deleteItem = (): void => {
    const updatedList = socialMediaList.filter((item) => item.id !== currentItemId);
    setSocialMediaList(updatedList);
    closeAlertBox();
  };

  const formik = useFormik({
    initialValues: { type: '', link: '', id: '' },
    onReset: () => {
      setIsEditing(false);
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        if (isEditing) {
          editListItem(values);
        } else {
          addListItem(values);
        }
        setSubmitting(false);
        resetForm();
      }, 400);
    },
  });

  const editItem = (item: SocialMediaListType): void => {
    handleOpenForm();
    setIsEditing(true);
    formik.setFieldValue('id', item.id);
    formik.setFieldValue('link', item.link);
    formik.setFieldValue('type', item.type);
    setCurrentItemId(item.id);
  };

  const handleCancelForm = (): void => {
    formik.resetForm();
    handleCloseForm();
  };

  return (
    <Box>
      <AlertBox
        title="آیا از تصمیم خود مطمئن هستید؟"
        open={openAlertBox}
        itemId={currentItemId}
        handleClose={closeAlertBox}
        handleAction={deleteItem}
      />
      <Typography>
        مسیر های ارتباطی
      </Typography>
      <Button onClick={toggleOpenForm} variant="text" endIcon={getIcon('add')}>
        {isEditing
          ? (
            <Typography>
              ویرایش مسیر ارتباطی
            </Typography>
          )
          : (
            <Typography>
              افزودن مسیر ارتباطی
            </Typography>
          )}
      </Button>
      <Collapse in={openForm}>
        <form onSubmit={formik.handleSubmit}>
          <Card>
            <CardHeader title={isEditing ? `ویرایش مسیر ارتباطی ${SOCIAL_MEDIA_TYPES[formik.values.type]}` : 'افزودن مسیر ارتباطی'} />
            <CardContent>
              <Grid container justifyContent="space-evenly" spacing={2}>
                <Grid item xs={4}>
                  <FormControl fullWidth sx={{ minWidth: 120 }}>
                    <InputLabel id="type-value-select-label">
                      نوع*
                    </InputLabel>
                    <Select
                      labelId="type-value-select-label"
                      label="نوع*"
                      name="type"
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      renderValue={(value) => (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {getIcon(formik.values.type)}
                          {value}
                        </div>
                      )}
                    >
                      <MenuItem value="instagram">
                        <Typography>
                          {SOCIAL_MEDIA_TYPES.instagram}
                        </Typography>
                      </MenuItem>
                      <MenuItem value="facebook">
                        <Typography>
                          {SOCIAL_MEDIA_TYPES.facebook}
                        </Typography>
                      </MenuItem>
                      <MenuItem value="telegram">
                        <Typography>
                          {SOCIAL_MEDIA_TYPES.telegram}
                        </Typography>
                      </MenuItem>
                      <MenuItem value="twitter">
                        <Typography>
                          {SOCIAL_MEDIA_TYPES.twitter}
                        </Typography>
                      </MenuItem>
                      <MenuItem value="linkedin">
                        <Typography>
                          {SOCIAL_MEDIA_TYPES.linkedin}
                        </Typography>
                      </MenuItem>
                      <MenuItem value="website">
                        <Typography>
                          {SOCIAL_MEDIA_TYPES.website}
                        </Typography>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    error={Boolean(formik.touched.link && formik.errors.link)}
                    fullWidth
                    label="لینک"
                    name="link"
                    value={formik.values.link}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.link && formik.errors.link && <div>{formik.errors.link}</div>}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    error={Boolean(formik.touched.id && formik.errors.id)}
                    fullWidth
                    label="(ID) آی دی"
                    name="id"
                    value={formik.values.id}
                    onChange={formik.handleChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={handleCancelForm}>انصراف</Button>
              <Button type="submit" disabled={formik.isSubmitting} variant="contained">
                {isEditing
                  ? (
                    <Typography>
                      {`ویرایش مسیر ارتباطی ${SOCIAL_MEDIA_TYPES[formik.values.type]}`}
                    </Typography>
                  )
                  : (
                    <Typography>
                      افزودن مسیر ارتباطی
                    </Typography>
                  )}
              </Button>
            </CardActions>
          </Card>
        </form>
      </Collapse>
      <List>
        {
        socialMediaList.length ? socialMediaList.map((item) => (
          <ListItem key={item.id}>
            <Grid container alignItems="center">
              <Grid item>
                {SOCIAL_MEDIA_TYPES[item.type]}
                {getIcon(item.type)}
              </Grid>
              <Grid item>
                {item.id}
              </Grid>
              <Grid item>
                {item.link}
              </Grid>
              <Grid item>
                <Button onClick={() => editItem(item)} variant="text" startIcon={getIcon('edit')}>
                  ویرایش
                </Button>
              </Grid>
              <Grid item>
                <Button color="error" onClick={() => deleteButtonClick(item.id)} variant="text" startIcon={getIcon('delete')}>
                  حذف
                </Button>
              </Grid>
            </Grid>
          </ListItem>
        )) : ''
      }
      </List>
    </Box>
  );
};

export default App;
