import { useState, ChangeEvent } from 'react';
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
  SelectChangeEvent,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Grid,
  List,
  ListItem,
} from '@mui/material';
import {
  Add, Edit, Delete,
} from '@mui/icons-material';
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
  const [linkValue, setLinkValue] = useState<string>('');
  const [idValue, setIdValue] = useState<string>('');
  const [currentItemId, setCurrentItemId] = useState<string>('');
  // TODO: make this type enum
  const [typeValue, setTypeValue] = useState<string>('');

  const toggleOpenForm = (): void => {
    setOpenForm(!openForm);
  };

  const handleOpenForm = (): void => {
    setOpenForm(true);
  };

  const closeAlertBox = (): void => {
    setOpenAlertBox(false);
  };

  const handleClearAll = (): void => {
    setIdValue('');
    setLinkValue('');
    setTypeValue('');
  };

  const addListItem = (): void => {
    const found = socialMediaList.some(
      (item) => item.id === idValue || item.link === linkValue || item.type === typeValue,
    );
    const isOneValueEmpty = idValue === '' || linkValue === '' || typeValue === '';
    if (!found && !isOneValueEmpty) {
      setSocialMediaList([...socialMediaList, { id: idValue, link: linkValue, type: typeValue }]);
      handleClearAll();
    }
  };

  const editListItem = (): void => {
    const newSocialMediaList = [...socialMediaList];
    const foundIndex = socialMediaList.findIndex((item) => item.id === idValue);
    newSocialMediaList[foundIndex] = {
      id: idValue,
      link: linkValue,
      type: typeValue,
    };
    setSocialMediaList(newSocialMediaList);
    handleClearAll();
    setIsEditing(false);
  };

  const cancelListItem = (): void => {
    handleClearAll();
    setIsEditing(false);
    toggleOpenForm();
  };

  const handleTypeValueChange = (e: SelectChangeEvent): void => {
    setTypeValue(e.target.value);
  };

  const handleLinkValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLinkValue(e.target.value);
  };

  const handleIdValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setIdValue(e.target.value);
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

  const editItem = (item: SocialMediaListType): void => {
    handleOpenForm();
    setIdValue(item.id);
    setLinkValue(item.link);
    setTypeValue(item.type);
    setIsEditing(true);
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
      <Button onClick={toggleOpenForm} variant="text" endIcon={<Add />}>
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
        <Card>
          <CardHeader title={isEditing ? `ویرایش مسیر ارتباطی ${SOCIAL_MEDIA_TYPES[typeValue]}` : 'افزودن مسیر ارتباطی'} />
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
                    value={typeValue}
                    onChange={handleTypeValueChange}
                    renderValue={(value) => (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {getIcon(typeValue)}
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
                <TextField fullWidth label="لینک" value={linkValue} onChange={handleLinkValueChange} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth label="(ID) آی دی" value={idValue} onChange={handleIdValueChange} />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button variant="outlined" onClick={cancelListItem}>انصراف</Button>
            <Button variant="contained" onClick={isEditing ? editListItem : addListItem}>
              {isEditing
                ? (
                  <Typography>
                    {`ویرایش مسیر ارتباطی ${SOCIAL_MEDIA_TYPES[typeValue]}`}
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
                <Button onClick={() => editItem(item)} variant="text" startIcon={<Edit />}>
                  ویرایش
                </Button>
              </Grid>
              <Grid item>
                <Button color="error" onClick={() => deleteButtonClick(item.id)} variant="text" startIcon={<Delete />}>
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
