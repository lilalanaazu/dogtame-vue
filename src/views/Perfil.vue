<template>
 <div>

<h1> Perfil de Usuario </h1>
<h2> {{user.name}}</h2>


 </div>
</template>

<script>

import { mapGetters} from 'vuex'

export default {
    name: 'Perfil',
    computed: {
        ... mapGetters(["user"]),
    },
};
</script>