import { useState } from "react";
import type { ComponentType } from "react";

import Stack from "@mui/material/Stack"
import Dialog from "@mui/material/Dialog"
import Snackbar from "@mui/material/Snackbar"
import Typography from "@mui/material/Typography"
import Table from "../../components/Table"
import { SnackbarCloseReason } from "@mui/material";

import { Alert } from "../../components/Alert"
import PrimaryButton from "../../components/Button/PrimaryButton"

type WithFetchDataProps = {
  pageTitle: string,
  columns: string[],
  successAlertMessage: string,
}

export function withFetchData<T, U>(Element: ComponentType<T>, CreateFormElement: ComponentType<U>, rtkQueryFn: any) {
  return (props: T & WithFetchDataProps) => {
      const [open, setOpen] = useState<boolean>(false);
      const [formOpen, setFormOpen] = useState<boolean>(false);
      const { data, isLoading, isError } = rtkQueryFn();

      function handleSnackBarClose(
          _: Event | React.SyntheticEvent<any, Event>,
          reason: SnackbarCloseReason
      ) {
          if (reason === 'clickaway') return;
          setOpen(false);
      }

      if (isLoading) {
          return <div>Loading...</div>
      }

      if (isError) {
          return <div>Something went wrong...</div>
      }

      return (
          <>
              <Stack direction="row" spacing={1.5} useFlexGap mb={3}>
                  <Typography variant="h4" component="h1">
                      {props.pageTitle}
                  </Typography>
                  <PrimaryButton
                      style={{ marginLeft: 'auto' }}
                      onClick={() => setFormOpen(true)}
                  >
                      Add New
                  </PrimaryButton>
              </Stack>
              <Table columns={props.columns}>
                  <Element {...(props as T)} data={data} />
              </Table>
              <Dialog open={formOpen} onClose={(e) => setFormOpen(false)}>
                  <CreateFormElement {...(props as U)} setOpen={setOpen} setFormOpen={setFormOpen} />
              </Dialog>
              <Snackbar open={open} autoHideDuration={4000} onClose={handleSnackBarClose}>
                  <Alert
                      onClose={() => handleSnackBarClose}
                      severity="success"
                      sx={{ width: "100%" }}
                  >
                      {props.successAlertMessage}
                  </Alert>
              </Snackbar>
          </>
      )
  }
}