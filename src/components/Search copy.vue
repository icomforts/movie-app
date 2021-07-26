<template>
  <div class="searchArea">
    <h2>搜尋電影</h2>
    <Form :model="formItem" class="form" :label-width="80" label-position="top">
      <FormItem label="Input">
        <Input
          v-model="formItem.input"
          placeholder="Enter something..."
        ></Input>
      </FormItem>
      <FormItem label="Select">
        <Select v-model="formItem.select" multiple>
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="DatePicker">
        <DatePicker
          type="daterange"
          placeholder="Select date"
          v-model="formItem.date"
        ></DatePicker>
      </FormItem>

      <FormItem label="Checkbox">
        <CheckboxGroup v-model="formItem.checkbox">
          <Checkbox label="Eat"></Checkbox>
          <Checkbox label="Sleep"></Checkbox>
          <Checkbox label="Run"></Checkbox>
          <Checkbox label="Movie"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="Slider">
        <Slider v-model="formItem.slider" range :step="10" show-stops></Slider>
      </FormItem>
      <FormItem>
        <Button type="primary">Submit</Button>
        <Button style="margin-left: 8px">Cancel</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  props: [],
  components: {},
  computed: {},
  data() {
    return {
      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: "",
      },
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.searchArea {
  margin-top: 6rem;
  padding: 0 10rem;
  h2 {
    font-size: 2rem;
    letter-spacing: 0.19rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  .form {
  }
}
</style>
