<template>
    <b-container fluid="">
        <b-row class="bg-dark text-white">
            <b-col lg="10" offset-lg="1" class="text-center pt-4">
                <ul class="list-inline mt-2">
                    <li class="list-inline-item">
                        <b-link v-b-modal.modal-feedback class="text-warning">
                            <small>Leave a Feedback</small>
                        </b-link>
                    </li>
                    <li class="list-inline-item">
                        <small>ERC20 Token Generator | MIT License</small>
                    </li>
                    <li class="list-inline-item"></li>
                    <li class="list-inline-item">
                        <small>
                            created by
                            <b-link class="text-warning" href="https://vittominacori.github.io/" target="_blank">
                                vittominacori
                            </b-link>
                        </small>
                    </li>
                </ul>
            </b-col>
        </b-row>
        <b-modal id="modal-feedback"
                 size="lg"
                 centered
                 hide-footer>
            <b-embed
                    type="iframe"
                    aspect="4by3"
                    src="https://docs.google.com/forms/d/e/1FAIpQLSe62q73MmB4_irkkI-HF9QWUpdIVDk8c7zF9UMy16g6n-KQbA/viewform?embedded=true"
                    allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                    allowfullscreen
            ></b-embed>
        </b-modal>
    </b-container>
</template>

<script>
  export default {
    name: 'Footer',
  };
</script>
