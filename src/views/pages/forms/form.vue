<template>
  <div class="row no-gutters">
    <div class="col-12">
      <form class="form-horizontal" role="form">
        <b-form-group id="example text" label-cols-sm="2" label-cols-lg="2" label="Text" label-for="text">
          <b-form-input for="text" value="Artisanal kale"></b-form-input>
        </b-form-group>

        <b-form-group id="example-search" label-cols-sm="2" label-cols-lg="2" label="Search" label-for="search">
          <b-form-input id="search" value="How do I shoot web" type="search" name="search"></b-form-input>
        </b-form-group>

        <b-form-group id="example-email" label-cols-sm="2" label-cols-lg="2" label="Email" label-for="email">
          <b-form-input id="email" value="bootstrap@example.com" class="bg-danger"></b-form-input>
        </b-form-group>

        <b-form-group id="example-url" label-cols-sm="2" label-cols-lg="2" label="URL" label-for="url">
          <b-form-input id="url" value="https://getbootstrap.com" type="url" name="url"></b-form-input>
        </b-form-group>

        <b-form-group id="example-tel" label-cols-sm="2" label-cols-lg="2" label="Telephone" label-for="tele">
          <b-form-input id="tele" value="1-(555)-555-5555" type="tel" name="tel"></b-form-input>
        </b-form-group>

        <b-form-group id="example-password" label-cols-sm="2" label-cols-lg="2" label="Password" label-for="pwd">
          <b-form-input id="pwd" type="password" value="hunter2"></b-form-input>
        </b-form-group>

        <b-form-group id="example-number" label-cols-sm="2" label-cols-lg="2" label="Number" label-for="number">
          <b-form-input id="number" value="42" type="number" name="number"></b-form-input>
        </b-form-group>

        <b-form-group id="example-date-time" label-cols-sm="2" label-cols-lg="2" label="Date and time"
          label-for="date-time">
          <b-form-input id="date-time" value="2019-08-19T13:45:00" type="datetime-local"></b-form-input>
        </b-form-group>

        <b-form-group id="example-date" label-cols-sm="2" label-cols-lg="2" label="Date" label-for="date">
          <b-form-input id="date" value="2019-08-19" type="date"></b-form-input>
        </b-form-group>

        <b-form-group id="example-month" label-cols-sm="2" label-cols-lg="2" label="Month" label-for="month">
          <b-form-input id="month" value="2019-08" type="month"></b-form-input>
        </b-form-group>

        <b-form-group id="example-week" label-cols-sm="2" label-cols-lg="2" label="Week" label-for="week">
          <b-form-input id="week" value="2019-W33" type="week"></b-form-input>
        </b-form-group>

        <b-form-group id="example-time" label-cols-sm="2" label-cols-lg="2" label="Time" label-for="time">
          <b-form-input id="time" value="13:45:00" type="time"></b-form-input>
        </b-form-group>

        <b-form-group id="example-color" label-cols-sm="2" label-cols-lg="2" label="Color" label-for="color">
          <b-form-input id="color" type="color" name="color" value="#556ee6"></b-form-input>
        </b-form-group>

        <div class="form-group row">
          <label class="col-md-2 col-form-label">Select</label>
          <div class="col-md-10">
            <select class="form-control">
              <option>Select</option>
              <option>Large select</option>
              <option>Small select</option>
            </select>
          </div>
        </div>
        <div class="form-group row mb-0">
          <label class="col-md-2 col-form-label">Custom Select</label>
          <div class="col-md-10">
            <select class="custom-select">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </form>
    </div>
    <!-- end col -->
  </div>
  <!-- end row -->
</template>>