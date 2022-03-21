import { useState, useMemo, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { CreateBikeDialog, ColorSample } from "../../components";
import { useLazyFetchAllBikesQuery } from "../../services/bikesService";

const BikesList = () => {
  const [fetchAllBikes, { data, isFetching }] = useLazyFetchAllBikesQuery();
  const [openModal, setOpenModal] = useState(false);
  const [selectedBike, setSelectedBike] = useState({});

  useEffect(() => {
    fetchAllBikes();
  }, []);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    fetchAllBikes();
  };

  const handleRowClick = (bike) => {
    setSelectedBike(bike.row);
    setOpenModal(true);
  };

  const columns = useMemo(
    () => [
      {
        field: "model",
        headerName: "Model",
        width: 150,
      },
      {
        field: "color",
        headerName: "Color",
        width: 150,
        renderCell: ({ value }) => <ColorSample color={value} />,
      },
      {
        field: "available",
        headerName: "Available",
        type: "boolean",
        width: 110,
      },
      {
        field: "location",
        headerName: "Location",
        width: 160,
        valueGetter: (params) =>
          `${params.row.location.city || ""}/${
            params.row.location.state || ""
          }`,
      },

      {
        field: "rating",
        headerName: "Rating",
        width: 200,
        renderCell: ({ value }) => <Rating value={value} readOnly />,
      },
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: ({ id }) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => console.log(id)}
          />,
        ],
      },
    ],
    []
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button
        variant="contained"
        endIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Create
      </Button>
      <CreateBikeDialog open={openModal} handleClose={handleClose} />
      <DataGrid
        rows={data || []}
        columns={columns}
        loading={isFetching}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onRowClick={handleRowClick}
        disableSelectionOnClick
      />
    </div>
  );
};

export default BikesList;
