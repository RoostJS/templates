<template v-if="UserStore.user.id">
  <v-container>
    <v-row>
      <v-col>
        <h1>{{UserStore.fullName}} Profile</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form v-model="valid" :lazy-validation="true">
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="First Name"
                  v-model="user.firstName"
                  :rules="[v => !!v || 'Required']"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Last Name"
                  v-model="user.lastName"
                  :rules="[v => !!v || 'Required']"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Phone"
                  v-model="user.phone"
                  :rules="[v => !!v || 'Required']"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Email"
                  v-model="user.email"
                  :rules="[v => !!v || 'Required']"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Password"
                  v-model="user.password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Role"
                  v-model="user.role"
                  :rules="[v => !!v || 'Required']"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn color="#9c27b0" dark :disabled="!valid" @click="submit">Save</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IUser } from '@/store/models/UserModel';
import UserStore from '@/store/UserStore';

@Component
export default class UserProfile extends Vue {
  get UserStore() {
    return UserStore;
  }

  user: Partial<IUser> = {
    firstName: UserStore.user?.firstName || '',
    lastName: UserStore.user?.lastName || '',
    phone: UserStore.user?.phone || '',
    email: UserStore.user?.email || '',
    password: UserStore.user?.password || '',
    role: UserStore.user?.role || '',
  };

  valid = true;

  async submit(): Promise<void> {
    await UserStore.updateUser(this.user).catch((err) => console.error(err));
  }
}
</script>
